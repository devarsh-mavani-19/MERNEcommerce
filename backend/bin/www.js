const dotenv = require("dotenv");
dotenv.config();
const app = require("../app");
const debug = require("debug")("server:server");
const http = require("http");

const mongoose = require("mongoose");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

mongoose.connect(process.env.MONGODB_URL).then(() => {
	server.listen(port);
	server.on("listening", onListening);
	console.log(`mongodb connected ${process.env.MONGODB_URL}`);
}).catch(err => {
	console.log(err);
	process.exit(1);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address();
	const bind = typeof addr === "string"
		? "pipe " + addr
		: "port " + addr.port;
	debug("Listening on " + bind);
}

module.exports = app;