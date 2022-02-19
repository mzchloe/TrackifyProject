const router = require("express").Router();
const bcrypt = require("bcrypt");
const Diary = require("../models/diary.model");
const { isLoggedIn } = require("../middlewares/guard");

//Nutrition page
router.get("/tracknutrition", (req, res) => {
    const data = {}
  res.render("nutrition", {data});
});

router.post("/tracknutrition", isLoggedIn, async (req, res) => {
  const diary = new Diary();
  diary.user = req.session.currentUser._id;
  diary.date = req.body.date;
  diary.breakfast.push({ test: "Test" });
  try {
    await diary.save();

    const data = await Diary.find({
      user: req.session.currentUser._id,
      date: req.body.date,
    });
    console.log(data);
    res.render("nutrition", { data });
  } catch (error) {
    console.log("error");
  } 
  //     const diary = Diary()
  //     diary.date = req.body.date
  //     diary.user = req.session._userid

  //     if (req.body.meal == 'breakfast') {
  //         diary.breakfast.push({
  //             foodtype: req.body.foodtype,
  //             portion: req.body.portion,

  //         })
  //     }
  //     diary.save()

  // const userDiary = Diary.findbyId(id: userId, date: user.date)
  // res.render('nutrition', {userDiary})
});

module.exports = router;
