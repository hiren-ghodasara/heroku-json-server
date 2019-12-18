// server.js
const jsonServer = require("json-server");
const express = require("express");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const path = require("path");
const fs = require('fs');
const router = jsonServer.router(path.join(__dirname, "db.json"));

server.use(middlewares);

server.use(express.json()) // for parsing application/json
server.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

server.get("/test", (req, res) => {
  res.status(200).send({
    text: "Hello!"
  });
});
//
server.use("/api/v1",require("./routes/index"));

// Define custom routes (routes.json)
const customRoutes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "routes.json"))
);
server.use("/api/v1", jsonServer.rewriter(customRoutes));
//
server.use("/api/v1", router);
const port = process.env.PORT || 3004;
server.listen(port, () => {
  console.log("JSON Server is running", port);
});
