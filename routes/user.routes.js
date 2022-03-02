const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const FoodItem = require("../models/food.model");
const { isLoggedIn } = require("../middlewares/guard");

// SignUp route
router.get("/signup", (req, res) => {
  res.render("signup", { message: "" });
});

// handles the creation of a user
router.post("/signup", async (req, res) => {
  const user = new User();
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = await bcrypt.hash(req.body.password, 10);
  try {
    await user.save();
    res.redirect("/user/login");
  } catch (error) {
    let message = 'Incomplete registration, please try again';
    res.render("signup", { message });
  }
});

// shows the log in form
router.get("/login", (req, res) => {
  const message = ""
  res.render("login", { message });
});

// handles the authentication of a user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const isPwCorrect = await bcrypt.compare(req.body.password, user.password);
    if (isPwCorrect) {
      req.session.currentUser = user;
      res.redirect("/user/profile");
    } else {
      let message = "Incorrect password, try again";
      res.render("login", { message });
    }
  } catch (error) {
    let message = "No user found";
    res.render("login", { message });
  }
});

//profile page
router.get("/profile", isLoggedIn, async (req, res) => {
  const today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  const rawData = await FoodItem.find({
    user: req.session.currentUser,
    date: {
      $gte: today,
    },
  });

  //shows the nutrition summary
  const totalCalories = [];
  const totalCarbs = [];
  const totalFat = [];
  const totalProtein = [];
  for (record of rawData) {
    totalCalories.push(record.calories);
    totalCarbs.push(record.carbs);
    totalFat.push(record.fat);
    totalProtein.push(record.protein);
  }


  const calSum = totalCalories.reduce((acc, value) => {
    return acc + value;
  }, 0); 

  const carbsSum = totalCarbs.reduce((acc, value) => {
    return acc + value;
  }, 0);

  const fatSum = totalFat.reduce((acc, value) => {
    return acc + value;
  }, 0);

  const proteinSum = totalProtein.reduce((acc, value) => {
  return acc + value;
}, 0);

  data = {
    totalCalories: calSum,
    totalCarbs: carbsSum,
    totalFat: fatSum,
    totalProtein: proteinSum,
  };
  res.render("profile", { data });
});

// route for logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/user/login");
});

module.exports = router;
