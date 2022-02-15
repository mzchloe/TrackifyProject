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

  module.exports = router;