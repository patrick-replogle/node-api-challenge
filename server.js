const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const actionRouter = require("./routers/actions-router.js");
const projectRouter = require("./routers/projects-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

module.exports = server;
