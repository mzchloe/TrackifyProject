// // ℹ️ Gets access to environment variables/settings
// // https://www.npmjs.com/package/dotenv
// require('dotenv/config');

// // ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const store = require("connect-mongo");
const dotenv = require("dotenv");
const app = express();
// template engine setup
app.set("view engine", "ejs");
// ejs layout setup
app.use(expressLayouts);

// middleware to extract the body from the request
app.use(express.urlencoded({ extended: false }));
// hooking up the public folder
app.use(express.static("public"));

app.use(
    session({
      secret: "helloworld",
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1200000,
      },
      store: store.create({
        mongoUrl: "mongodb://localhost/trackify-project",
      }),
    })
  );


// // ℹ️ This function is getting exported from the config folder. It runs most middlewares
// // require('./config')(app);

// default value for title local
const projectName = 'project-trackify';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Ironhack Project 2 - Trackify`;


// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

//User Route
const userRouter = require('./routes/user.routes');
app.use('/user', userRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
// require('./error-handling')(app);

module.exports = app;

