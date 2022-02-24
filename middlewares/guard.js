// this file contains middlewares to manage routes access
const session = require('express-session')

// checking if user is logged in
function isLoggedIn(req, res, next) {
    if (!req.session.currentUser) {
      res.render("login", { message: 'you are not logged in' });
    } 
    next()
  }
  
  // checking if user is logged out
  function isLoggedOut(req, res, next) {}
  
  module.exports = { isLoggedIn, isLoggedOut };