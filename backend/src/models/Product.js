const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");
const product = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
		},
		image: {
			type: String,
			require: true,
		},
		category: {
			type: String,
			require: true,
		},
		price: {
			type: Number,
			require: true
		}
	},
	schemaOptions
);

module.exports = mongoose.model("Product", product);
