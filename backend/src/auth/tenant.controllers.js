import User from "../models/User.js";

export const tenantExists = async (req, res) => {
  try {
    const tenantSlug = req.tenant?.toLowerCase().trim();

    if (!tenantSlug) {
      return res.status(400).json({
        message: "Tenant required",
      });
    }
    const user = await User.findOne({
      slug: tenantSlug,
      role: "teacher",
    });

    if (!user) {
      return res.status(404).json({
        message: "Tenant not found",
      });
    }

    return res.status(200).json({
      message: "Tenant exists",
      exists: true,
      tenant: {
        name: user.name,
        slug: user.slug,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
