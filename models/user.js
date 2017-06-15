var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	ObjectId: mongoose.Schema.ObjectId,
    username: String,
    password: String,
    info: {type: String, default: Date.now()},
    avatar: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);