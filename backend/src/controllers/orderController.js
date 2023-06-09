const { ObjectId } = require("mongodb");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
	// place order from cart
	try {
		let id = new ObjectId(req.user._id);
		let cart = await Cart.findOne({ user: id });
		if (!cart || !cart.items || cart.items.length == 0) {
			res.status(403).json("Cart is empty");
			return;
		}
		let total = 0;
		cart.items.forEach((item) => {
			total += item.price * item.quantity;
		});
		let order = await Order.create({
			items: cart.items,
			total: total,
			user: id,
			timeStamp: new Date(),
		});
		await Cart.updateOne(
			{ user: id, _id: cart._id },
			{ $set: { items: [] } }
		);
		res.status(200).json(order);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Something went wrong" });
	}
};

exports.getAllOrders = async (req, res) => {
	try {
		let id = new ObjectId(req.user._id);
		let orders = await Order.find({ user: id });
		res.status(200).json(orders);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Something went wrong" });
	}
};
