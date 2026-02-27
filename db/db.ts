import { config } from "../config/env";
import mongoose from "mongoose";

/**
 * MongoDB connection module
 * 
 * uses mongoose.connect and passes the url for db connection from the config
 * logs the successfull connection or the error occurred.
 */
const connectDb = async () => {
    try {
        await mongoose.connect(config.dburl ?? "");
        console.log("MongoDB connected");
    }catch (err) {
        console.log(`Error while connecting to mongodb : ${err}`);
    }
}

export { connectDb };