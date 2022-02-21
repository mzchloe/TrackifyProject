const router = require("express").Router();
const bcrypt = require("bcrypt");
const FoodItem = require("../models/food.model");
const { isLoggedIn } = require("../middlewares/guard");
const { redirect } = require("express/lib/response");

//Nutrition page
router.get("/tracknutrition", async (req, res) => {
  //const date = new Date()
  const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  const data = await FoodItem.find({
    user: req.session.currentUser._id,
    date:{
      $gt: today
    },
  });
  res.render("nutrition", { data });
});

router.post("/tracknutrition", isLoggedIn, async (req, res) => {
  const foodItem = new FoodItem();
  foodItem.user = req.session.currentUser._id;
  foodItem.date = req.body.date
  foodItem.mealType = req.body.mealType;
  foodItem.foodType = req.body.foodType;
  foodItem.portion = req.body.portion;
  foodItem.portionUnit = req.body.portionUnit;
  foodItem.calories = req.body.calories;
  foodItem.carbs = req.body.carbs;
  foodItem.fat = req.body.fat;
  foodItem.protein = req.body.protein;
  console.log(req.body)
  try {
    await foodItem.save();
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    const data = await FoodItem.find({
      user: req.session.currentUser._id,
      date:{
        $gt: today
      },
    });
    
    res.render("nutrition", {data});
  } catch (error) {
    res.redirect("/nutri/tracknutrition");
  }
});  

module.exports = router;
