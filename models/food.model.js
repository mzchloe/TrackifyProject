const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
	mealtype: {
	  type: String,
	},
	date: {
	  type: Date,
	  default: Date.now,
	  required: true,
	},
	user: {
	  type: mongoose.SchemaTypes.ObjectId,
	  ref: 'User'
	},
	foodType: {
	  type: String,
	  required: true,
	},
	portion: {
		type: Number
	},
	portionUnit: {
		type: String
	},
	calories: {
		type: Number
	  },
	carbs: {
		type: Number
	},
	fat: {
		type: Number
	},
	protein: {
		type: Number
	}
  });

module.exports = mongoose.model("FoodItem", foodSchema);