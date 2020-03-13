const express = require('express');

const projectsRouter = require("./projects/projectsRouter");
const actionsRouter = require("./actions/actionsRouter");

const server = express();

//custom middleware

function logger(req, _res, next) {
  console.log(
    `[${new Date().toISOString()}]: ${req.method} to ${req.url}`
  );

  next();
}

server.use(express.json());
server.use(logger);
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

module.exports = server;