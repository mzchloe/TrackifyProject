const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require('method-override')
const session = require("express-session");
const store = require("connect-mongo");
const dotenv = require("dotenv");
const isLoggedIn = require('./middlewares/guard')
const app = express();

//connects to the environment .env
dotenv.config()

mongoose.connect(process.env.MONGODB_URL);

// template engine setup
app.set("view engine", "ejs");
// ejs layout setup
app.use(expressLayouts);

// middleware to extract the body from the request
app.use(express.urlencoded({ extended: false }));
// middle ware for using more http verbs in the html
app.use(methodOverride('_method'))
// hooking up the public folder
app.use(express.static("public"));

//required for the app when deployed to Heroku (in production)
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1200000,
    },
    store: store.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
  })
);


// default value for title local
const projectName = "project-trackify";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Ironhack Project 2 - Trackify`;

// middle ware for making the user available to all templates
app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser;
  next();
});

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

//User Route
const userRouter = require("./routes/user.routes");
app.use("/user", userRouter);

//Nutrition Route
const nutriRoute = require("./routes/nutri.routes");
app.use("/nutri", nutriRoute);

//Recipes Route
const recipesRoute = require("./routes/recipes.routes")
app.use("/recipes", recipesRoute);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
