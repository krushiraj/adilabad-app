import dotenv from "dotenv";

dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  BACKEND_HOST: process.env.BACKEND_HOST || "http://localhost:8000",
};

export default config;
