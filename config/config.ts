import dotenv from "dotenv";

dotenv.config();

export type Config = {
  PORT: number;
  MONGODB_CONNECTION: string;
  JWT_ACCESS_TOKEN_EXPIRY_TIME: string;
  JWT_ACCESS_TOKEN_SECRET: string;
  PASSWORD_HASH_SALTROUNDS: number;
};

const config: Config = {
  PORT: Number(process.env.PORT) || 8080,
  MONGODB_CONNECTION: process.env.MONGODB_CONNECTION || "",
  JWT_ACCESS_TOKEN_EXPIRY_TIME: process.env.JWT_ACCESS_TOKEN_EXPIRES || "10h",
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || "",
  PASSWORD_HASH_SALTROUNDS: Number(process.env.PASSWORD_HASH_SALTROUNDS) || 8,
};

export default config;
