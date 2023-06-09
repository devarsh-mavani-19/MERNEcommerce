const Product = require("../models/Product");

exports.getAllCategories = async (req, res) => {
	try {
		let categories = await Product.distinct("category");
		res.status(200).json(categories);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Something went wrong" });
	}
};
