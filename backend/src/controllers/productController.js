const Product = require("../models/Product");

exports.getOne = async (req, res) => {
	try {
		let id = req.params.id;
		let product = await Product.findById(id);
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

exports.getAll = async (req, res) => {
	try {
		let products = await Product.find();
		res.status(200).json(products);
	} catch (err) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

exports.getAllByCategory = async (req, res) => {
	try {
		let catId = req.params.categoryId;
		let products = await Product.find({ category: catId });
		res.status(200).json(products);
	} catch (err) {
		res.status(500).json({ message: "Something went wrong" });
	}
};
