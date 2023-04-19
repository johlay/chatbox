import app from "./express";
import config from "./config/config";
import http from "http";
import mongoose from "mongoose";
import routes from "./mvc/routes";
import { initSocketIO } from "./socketio";

const PORT: number = config.PORT;
const DB_OPTIONS = {};

const server = http.createServer(app);

// initiate socketio
initSocketIO(server);

app.use("/api/", routes);

mongoose.connect(config.MONGODB_CONNECTION as string, DB_OPTIONS).then(
  () => console.log("Connection to MongoDB is etablished"),
  (err) => console.error("error:", err)
);

server.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
