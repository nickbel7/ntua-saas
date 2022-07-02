const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const db = require("./config/database");
const cors = require('cors');

// MIDDLEWARE FOR CROSS-ORIGIN REQUESTS
app.use(cors());

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const baseurl = "/flows/api"

// server listening 
server.listen(port, () => {
  console.log(`Flows API server running on: http://localhost:${port}/flows/api`);
});

db.checkConnection();

// Admin endpoints.
app.use(baseurl + "/healthcheck", require("./admin/healthcheck"));
app.use(baseurl + "/resetcountries", require("./admin/resetcountries"));
app.use(baseurl + "/resetflows", require("./admin/resetflows"));

// Functional endpoints.
app.use(baseurl + "/data", require("./functional/data"));
app.use(baseurl + "/stream", require("./functional/stream"));
app.use(baseurl + "/parser", require("./functional/parser"));

process.on('SIGINT', function() {
    console.log("\nFlows API server shuting down.");
    db.sequelize.close();
    server.close();
    process.exit();
});