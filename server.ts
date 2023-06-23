import config from "./config/config";
import app from "./express";
import routes from "./mvc/routes";
import { initSocketIO } from "./socketio";
import cors from "cors";
import http from "http";
import { logger } from "./logger";
import mongoose from "mongoose";

const PORT: number = config.PORT;
const DB_OPTIONS = {};

export const server = http.createServer(app);
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

// initiate socketio
initSocketIO(server);

app.use(cors(corsOptions));
app.use("/api/", routes);

mongoose.connect(config.MONGODB_CONNECTION as string, DB_OPTIONS).then(
  () => logger.info("Connection to MongoDB is established"),
  (err) => logger.error("error: %s", err)
);

server.listen(PORT, () => {
  logger.info("Server running on port: %d", PORT);
});
