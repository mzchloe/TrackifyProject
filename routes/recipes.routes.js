const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const FoodItem = require("../models/food.model");
const { isLoggedIn } = require("../middlewares/guard");

//Recipe route
router.get("/recipes", (req, res) => {
    res.render("recipes");
  });

module.exports = router;