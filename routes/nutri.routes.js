const router = require("express").Router();
const bcrypt = require("bcrypt");
const FoodItem = require("../models/food.model");
const { isLoggedIn } = require("../middlewares/guard");
const { redirect } = require("express/lib/response");

//Nutrition page
router.get("/tracknutrition", async (req, res) => {
  //const date = new Date()
  const date = Date.now()

  //console.log(date)
  const data = await FoodItem.find({
    user: req.session.currentUser._id,
    date: date,
  });
  //console.log(data)
  res.render("nutrition", { data });
});

router.post("/tracknutrition", isLoggedIn, async (req, res) => {
  const foodItem = new FoodItem();
  foodItem.user = req.session.currentUser._id;
  foodItem.date = req.body.date;
  foodItem.mealType = req.body.mealType;
  foodItem.foodType = req.body.foodType;
  foodItem.portion = req.body.portion;
  foodItem.portionUnit = req.body.portionUnit;
  foodItem.calories = req.body.calories;
  foodItem.carbs = req.body.carbs;
  foodItem.fat = req.body.fat;
  foodItem.protein = req.body.protein;
  console.log("date now locale string", new Date().toLocaleDateString())
  console.log("date now",Date.now())
  try {
    await foodItem.save();

    const data = await FoodItem.find({
      user: req.session.currentUser._id,
      date: Date.parse(Date.now())
    })
    
    res.render("nutrition", { data });
  } catch (error) {
    res.redirect("/nutri/tracknutrition");
  }
});  

module.exports = router;
