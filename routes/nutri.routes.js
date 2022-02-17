const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { isLoggedIn } = require("../middlewares/guard");

//Nutrition page
router.get("/tracknutrition", (req, res) => {
    res.render("nutrition")
})

module.exports = router;