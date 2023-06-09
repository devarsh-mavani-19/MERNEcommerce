const { addToCart, getCart, deleteItemFromCart } = require("../controllers/cartController");
const { authenticateToken } = require("../middlewares/authenticateToken");

var router = require("express").Router();

router.get("/", authenticateToken, getCart);
router.put("/", authenticateToken, addToCart);
router.delete("/:itemId", authenticateToken, deleteItemFromCart);

module.exports = router;
