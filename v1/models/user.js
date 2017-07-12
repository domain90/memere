var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	// id: Number;
	//_id: { type: Schema.ObjectId, auto: true };
    
    username: String,
    password: String,
    info: {type: String, default: Date.now()},
    avatar: String,
    
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        avatar       : String
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);