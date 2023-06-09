var router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/category", require("./category"));
router.use("/products", require("./product"));
router.use("/cart", require("./cart"));
router.use("/orders", require("./orders"));

module.exports = router;
