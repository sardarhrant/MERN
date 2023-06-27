import express from "express";
import config from "./config";

const server = express();

server.use(express.static("dist"));

server.set("view engine", "ejs");

server.use("/", (req, res) => {
    res.render("index", {
        content: "<em>EJS is Cool</em>"
    });
});

server.listen(config.PORT, config.HOST, () => {
    console.log(`Express server is listening at ${config.SERVER_URL}`);
});