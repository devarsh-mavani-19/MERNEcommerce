const { getOne, getAllByCategory, getAll } = require("../controllers/productController");

var router = require("express").Router();

router.get("/:id", getOne);
router.get("/category/:categoryId", getAllByCategory);
router.get("/", getAll);

module.exports = router;
