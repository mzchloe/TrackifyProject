const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model')

// SignUp route
router.get("/signup", (req, res) => {
    res.render("signup");
  });

// handles the creation of a user
router.post("/signup", async (req, res) => {
  const user = new User();
  // user.email = req.body.email;
  try {
    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    res.redirect("/user/login");
  } catch (error) {
    res.redirect("/user/signup");
  }
});


// shows the log in form
router.get("/login", (req, res) => {
  res.render("login");
});


// handles the authentication of a user
router.post("/login", async (req, res) => {
  try {
    // const user = await User.findOne({ email: req.body.email });
    // const isPwCorrect = await bcrypt.compare(req.body.password, user.password);
    // if (isPwCorrect) {
    //   req.session.currentUser = user;
      res.redirect("/user/profile");
    // } else {
    //   res.redirect("/user/login");
    // }
  } catch (error) {
    res.redirect("/user/login");
  }
});
  module.exports = router;