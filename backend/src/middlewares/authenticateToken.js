const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.TOKEN_SECRET, async (err, jwtRes) => {
		if (err) return res.sendStatus(401);
		let user = await User.findOne({ email: jwtRes.email });
		if (!user) {
			res.sendStatus(401);
		}
		req.user = user;
		next();
	});
};
