const router = require("express").Router();
const bcrypt = require("bcrypt");
const FoodItem = require("../models/food.model");
const { isLoggedIn } = require("../middlewares/guard");
const { redirect } = require("express/lib/response");

//Route to display nutrition page
router.get("/tracknutrition", async (req, res) => {
  //const date = new Date()
  const today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  const data = await FoodItem.find({
    user: req.session.currentUser._id,
    date: {
      $gte: today,
    },
  });
  res.render("nutrition", { data });
});

//Handling the food entry form
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
  try {
    await foodItem.save();
    const today = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    //const today = new Date(oldDate.toDateString());
    const data = await FoodItem.find({
      user: req.session.currentUser._id,
      date: {
        $gte: today,
      },
    });

    res.render("nutrition", { data });
  } catch (error) {
    res.redirect("/nutri/tracknutrition");
  }
});

//show the edit form
router.get("/update/:id", async (req, res) => {
  const food = await FoodItem.findById(req.params.id);
  //console.log(food);
  res.render("update", { food });
});

//updating the changes 
router.put("/update/:id", async (req, res) => {
  req.foodItem = await FoodItem.findById(req.params.id);
  req.foodItem.foodType = req.body.foodType;
  req.foodItem.portion = req.body.portion;
  req.foodItem.portionUnit = req.body.portionUnit;
  req.foodItem.calories = req.body.calories;
  req.foodItem.carbs = req.body.carbs;
  req.foodItem.fat = req.body.fat;
  req.foodItem.protein = req.body.protein;

  try {
    await req.foodItem.save();
    const today = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );

    const data = await FoodItem.find({
      user: req.session.currentUser._id,
      date: {
        $gte: today,
      },
    });
    res.render("nutrition", { data });
  } catch (error) {
    console.log("error");
    res.redirect("nutri/tracknutrition");
  }
});

router.delete('/delete/:id', async (req, res) => {
  await FoodItem.findByIdAndDelete(req.params.id)
  res.redirect('/nutri/tracknutrition')
})


module.exports = router;
