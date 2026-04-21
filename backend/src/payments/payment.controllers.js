import Razorpay from "razorpay";
import crypto from "crypto";
import Course from "../models/Course.js";
import Enrollments from "../models/Enrollments.js";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.TEST_KEY_ID,
  key_secret: process.env.TEST_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;
    const tenant = req.tenant;

    // 1. Ensure the resolved user is actually a student
    if (!req.user || req.user.role !== "student") {
      return res
        .status(403)
        .json({ message: "Only students can purchase courses" });
    }

    const course = await Course.findById(courseId);

    // 2. Validate course exists and is paid
    if (!course || course.price <= 0) {
      return res.status(400).json({ message: "Invalid course or price" });
    }

    // 3. Ensure the course belongs to the tenant processing the order
    if (course.tenant !== tenant) {
      return res
        .status(403)
        .json({ message: "Course does not belong to this tenant" });
    }

    if (!course.isPublished) {
      return res
        .status(403)
        .json({ message: "Course not available for enrollment" });
    }

    const options = {
      amount: course.price * 100,
      currency: "INR",
      // Shorten the courseId so it easily fits within the 40 character limit
      receipt: `rcpt_${courseId.slice(-6)}_${Date.now()}`,
      notes: {
        studentId: studentId.toString(),
        courseId: courseId.toString(),
        tenant: tenant,
      },
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Error creating payment order", error });
  }
};

export const handleWebhook = async (req, res) => {
  try {
    // Razorpay sends the signature in this header
    const signature = req.headers["x-razorpay-signature"];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify the webhook signature to ensure it's from Razorpay
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body) // Body must be raw/stringified JSON
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: "Invalid Webhook Signature" });
    }

    const event = req.body.event;

    // Handle successful payment
    if (event === "order.paid" || event === "payment.captured") {
      const paymentEntity = req.body.payload.payment.entity;

      // Extract the notes we attached during order creation
      const { studentId, courseId, tenant } = paymentEntity.notes;

      if (studentId && courseId && tenant) {
        // Check if already enrolled to avoid duplicates
        const existing = await Enrollments.findOne({ studentId, courseId });

        if (!existing) {
          await Enrollments.create({
            studentId,
            courseId,
            tenant,
          });
          console.log(
            `Successfully enrolled user ${studentId} in course ${courseId} via Webhook!`,
          );
        }
      }
    }

    // Acknowledge the webhook quickly with a 200 OK so Razorpay doesn't retry
    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ message: "Webhook error", error });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;

    const studentId = req.user.id;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.TEST_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // optional: immediate enrollment (UX)
    const existing = await Enrollments.findOne({ studentId, courseId });

    if (!existing) {
      await Enrollments.create({
        studentId,
        courseId,
        tenant: req.tenant,
      });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Verification failed", err });
  }
};
