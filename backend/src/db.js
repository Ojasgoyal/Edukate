import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`✅ MongoDB Connect Successfully`);
    } catch (error) {
        console.error("Mongo DB connection Error", error)
        process.exit(1)
    }
}

export default connectDB