import { config } from "../config/env";
import mongoose from "mongoose";

// mongodb connection methods
const connectDb = async () => {
    try {
        await mongoose.connect(config.dburl ?? "");
        console.log("MongoDB connected");
    }catch (err) {
        console.log(`Error while connecting to mongodb : ${err}`);
    }
}

export { connectDb };