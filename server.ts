import app from "./express";
import http from "http";
import routes from "./mvc/routes";
import { initSocketIO } from "./socketio";
import config from "./config/config";

const PORT: number = config.port;

const server = http.createServer(app);

// initiate socketio
initSocketIO(server);

app.use("/api/", routes);

server.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
