import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        if (!MONGO_URI) {
            throw new Error("❌ MONGO_URI is not set in the environment variables.");
        }
        
        // // Convert old-style URL to new format
        // const formattedURI = MONGO_URI.replace(
        //     /mongodb:\/\/([^:]+):([^@]+)@([^\/]+)\/([^?]+)/,
        //     'mongodb+srv://$1:$2@cluster0.asmgq.mongodb.net/$4'
        // );

        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            writeConcern: {
                w: 'majority',
                wtimeout: 2500
            }
        });
        console.log("🔥 MongoDB Connected!");
    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err);
        process.exit(1);
    }
}

export default connectDB;