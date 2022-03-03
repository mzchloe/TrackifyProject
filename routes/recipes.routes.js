const router = require("express").Router();
const bcrypt = require("bcrypt");
const FoodItem = require("../models/food.model");
const { isLoggedIn } = require("../middlewares/guard");
require("dotenv/config");
const axios = require("axios").default;

router.get("/recipes", isLoggedIn, async (req, res) => {
    const data = '';
    res.render("recipes", {data});
})

router.post("/recipes", isLoggedIn, async (req, res) => {
    const { RecipeSearchClient } = require('edamam-api');
    const client = new RecipeSearchClient({
     appId: `${process.env.CLIENT_ID}`,
     appKey: `${process.env.CLIENT_SECRET}`
}); 
const searchInput = req.body.searchInput 
    const results = await client.search({ query: {calories: searchInput } }); 
    const data = results["hits"].slice(0,6);

    res.render("recipes", {data});
})

module.exports = router; 