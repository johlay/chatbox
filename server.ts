import app from "./express";
import http from "http";
import routes from "./mvc/routes";
import { initSocketIO } from "./socketio";

const PORT: number = Number(process.env.PORT) || 8000;

const server = http.createServer(app);

// initiate socketio
initSocketIO(server);

// routes
app.use("/api/", routes);

server.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
