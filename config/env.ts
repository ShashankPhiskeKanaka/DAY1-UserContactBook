import dotenv from "dotenv";

// defining the environment constants to be used, dependant on development, production etc

const env = process.env.NODE_ENV || "development"

dotenv.config({
    path : `.env.${env}`
});

const config = {
    env,
    port : process.env.PORT || 5000,
    dburl : process.env.DATABASE_URL!,
    secret : process.env.SECRET,
    file_cloud_name : process.env.FILE_CLOUD_NAME || "",
    file_api_key : process.env.FILE_API_KEY || "",
    file_api_secret : process.env.FILE_API_SECRET || ""
}

export { config }