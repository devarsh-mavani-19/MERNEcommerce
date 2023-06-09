const Cart = require("../models/Cart");
var ObjectId = require("mongodb").ObjectId;

exports.getCart = async (req, res) => {
	try {
		let id = new ObjectId(req.user._id);
		console.log(id);
		let query = [
			{
				$match: {
					user: id,
				},
			},
			{
				$unwind: {
					path: "$items",
				},
			},
			{
				$lookup: {
					from: "products",
					localField: "items.productId",
					foreignField: "_id",
					as: "items.product",
				},
			},
			{
				$unwind: {
					path: "$items.product",
				},
			},
			{
				$group: {
					_id: "$_id",
					user: {
						$first: "$user",
					},
					items: {
						$push: "$items",
					},
				},
			},
		];

		let data = await Cart.aggregate(query);
		console.log(data);
		res.status(200).json(data ? data[0] : data);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Somethign went wrong" });
	}
};

exports.addToCart = async (req, res) => {
	try {
		let id = new ObjectId(req.user._id);
		const { productId, price, quantity } = req.body;
		let itemObjectId = new ObjectId(productId);

		const existingCart = await Cart.findOne({ user: id });

		if (existingCart) {
			const existingItemIndex = existingCart.items.findIndex(
				(item) => item.productId.toString() === productId
			);
			if (
				existingItemIndex !== -1 &&
				existingCart.items[existingItemIndex].price == price
			) {
				console.log(existingCart.items[existingItemIndex].price);
				existingCart.items[existingItemIndex].quantity +=
					Number.parseInt(quantity);
				existingCart.items[existingItemIndex].price = price;
				await existingCart.save();
			} else {
				console.log("PUSIGN");
				existingCart.items.push({
					productId: itemObjectId,
					price,
					quantity,
				});
				await existingCart.save();
			}
		} else {
			await Cart.create({
				user: id,
				items: [{ productId: itemObjectId, price, quantity }],
			});
		}

		res.status(200).json("Item Added to cart");
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Something went wrong" });
	}
};

exports.deleteItemFromCart = async (req, res) => {
	try {
		let id = new ObjectId(req.user._id);
		const { itemId } = req.params;
		console.log(itemId);
		let itemObjectId = new ObjectId(itemId);
		console.log(itemObjectId);
		let data = await Cart.updateOne(
			{ user: id },
			{ $pull: { items: { _id: itemObjectId } } }
		);
		console.log(data);
		res.status(200).json("Item Removed from cart");
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Somethign went wrong" });
	}
};
