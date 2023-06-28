import express from "express";
import config from "./config";
import apiRouter from "./api-router";

const server = express();

server.use(express.static("dist"));

server.set("view engine", "ejs");

server.use("/api", apiRouter);

server.use("/", (req, res) => {
    res.render("index", {
        content: "<em>EJS is Cool</em>"
    });
});

server.listen(config.PORT, config.HOST, () => {
    console.log(`Express server is listening at ${config.SERVER_URL}`);
});