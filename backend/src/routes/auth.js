const { login, register } = require("../controllers/authController");

var router = require("express").Router();
router.post("/login", login);
router.post("/register", register);
module.exports = router;
