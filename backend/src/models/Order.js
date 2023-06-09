const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");
const { Schema } = require("mongoose");

const order = new mongoose.Schema(
	{
		items: [
			{
				productId: Schema.Types.ObjectId,
				price: Number,
				quantity: Number,
			},
		],
		total: {
			type: Number,
		},
		user: {
			type: Schema.Types.ObjectId,
		},
		timeStamp: {
			type: Schema.Types.Date,
		},
	},
	schemaOptions
);

module.exports = mongoose.model("Order", order);
