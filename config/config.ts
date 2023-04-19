import dotenv from "dotenv";

dotenv.config();

export type Config = {
  PORT: number;
  MONGODB_CONNECTION?: string;
};

const config: Config = {
  PORT: Number(process.env.PORT) || 8000,
  MONGODB_CONNECTION: process.env.MONGODB_CONNECTION,
};

export default config;
