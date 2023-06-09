const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./src/routes");

app.use(cors());
app.use(express.json());

app.use((req, res, n) => {
	console.log(req.url);
	n();
});

app.use("/api/v1", routes);

app.get("/", (_req, res) => {
	res.status(200).json({ message: "Server Status On!" });
});

module.exports = app;