import { config } from "../config/env.js";
import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(config.dburl ?? "");
        console.log("MongoDB connected");
    }catch (err) {
        console.log(`Error while connecting to mongodb : ${err}`);
    }
}

export { connectDb };