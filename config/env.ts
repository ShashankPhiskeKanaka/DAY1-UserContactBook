import dotenv from "dotenv";

const env = process.env.NODE_ENV || "development"

dotenv.config({
    path : `.env.${env}`
});

const config = {
    env,
    port : process.env.PORT || 5000,
    dburl : process.env.URI!
}

export { config }