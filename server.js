const { initSocketIO } = require("./socketio");
const http = require("http");
const PORT = process.env.PORT || 8000;

const app = require("./express.js");
const server = http.createServer(app);

// initiate socketio
initSocketIO(server);

server.listen(PORT, (err) => {
  if (err) console.log(err);

  console.log("Server running on port:", PORT);
});
