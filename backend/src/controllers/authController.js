const User = require("../models/User");
const { generateWebTokenForEmail } = require("../utils/jwtUtils");
const Cart = require("../models/Cart");

exports.login = async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;

		let user = await User.findOne({ email: email });
		if (!user) {
			req.status(404).json("Not Found");
		}
		if (!user.validPassword(password)) {
			//password did not match
			res.status(404).json({ message: "Invalid Password" });
		} else {
			// password matched. proceed forward
			const token = generateWebTokenForEmail({ email });
			res.status(200).json({ token, email });
		}
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: "Something went wrong" });
	}
};

exports.register = async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		var new_user = new User({
			email: email,
		});

		new_user.password = new_user.generateHash(password);
		await new_user.save();
		await Cart.create({ items: [], user: new_user._id });
		res.status(200).json({ message: "User created" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Something went wrong" });
	}
};
