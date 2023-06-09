const { getAllCategories } = require("../controllers/categoryController");

var router = require("express").Router();

router.get("/", getAllCategories);

module.exports = router;
