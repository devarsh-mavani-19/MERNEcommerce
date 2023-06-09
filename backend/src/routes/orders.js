const { placeOrder, getAllOrders } = require("../controllers/orderController");
const { authenticateToken } = require("../middlewares/authenticateToken");

var router = require("express").Router();

router.post("/", authenticateToken, placeOrder);
router.get("/", authenticateToken, getAllOrders);

module.exports = router;
