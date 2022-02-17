const mongoose = require("mongoose");

const diarySchema = mongoose.Schema({
	user: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "User",
		required: true,
	},
	date: {
		type: Date,
		required: true
	},
	breakfast: {
		type: [],
	},
	lunch: {
		type: [],
	},
	dinner: {
		type: [],
	},
	snack: {
		type: [],
	}
})

module.exports = mongoose.model("Diary", diarySchema);