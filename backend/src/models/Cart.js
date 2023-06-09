const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");
const { Schema } = require("mongoose");

const cart = new mongoose.Schema(
	{
		items: [
			{
				productId: Schema.Types.ObjectId,
				price: Number,
				quantity: Number,
			},
		],
		user: {
			type: Schema.Types.ObjectId,
		},
	},
	schemaOptions
);

module.exports = mongoose.model("Cart", cart);
