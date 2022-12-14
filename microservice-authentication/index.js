const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const db = require("./config/database");
const cors = require('cors');

// Middleware for cross-origin requests.
app.use(cors(
  {
    origin: ["http://127.0.0.1", "http://localhost", "https://web-server-image-47nenum5kq-ew.a.run.app"],
    credentials: true,  // Allows credentials(cookies) in http responses
  }
));

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const baseurl = "/authorisation/api"

// Server listening. 
server.listen(port, () => {
  console.log(`Authorisation API server running on: http://localhost:${port}/authorisation/api`);
});

db.checkConnection();

// Admin endpoints.
app.use(baseurl + "/healthcheck", require("./admin/healthcheck"));
app.use(baseurl + "/resetusers", require("./admin/resetusers"));

// Functional endpoints.
app.use(baseurl + "/register", require("./functional/register"));
app.use(baseurl + "/login", require("./functional/login"));
app.use(baseurl + "/logout", require("./functional/logout"));
app.use(baseurl + "/welcome", require("./functional/welcome"));
app.use(baseurl + "/renew", require("./functional/renew"));
app.use(baseurl + "/userinfo", require("./functional/userinfo"));

process.on('SIGINT', function() {
    console.log("\nAuthorisation API server shuting down.");
    db.sequelize.close();
    server.close();
    process.exit();
});