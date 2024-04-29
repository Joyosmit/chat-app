import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectToMongoDB = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("COnnected to MOngoDB")
    } catch (error) {
        console.log("Error connecting to mongodb",error.message)
    }
}

export default connectToMongoDB;