import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/env";

const cloudinaryConfig = async () => {
    cloudinary.config({
        cloud_name : config.file_cloud_name,
        api_key : config.file_api_key,
        api_secret : config.file_api_secret
    });
}

export { cloudinaryConfig }