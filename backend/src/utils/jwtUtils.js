const jwt = require("jsonwebtoken");

exports.generateWebTokenForEmail = (email) => {
	return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
};
