var express = require("express");
var app = express();
var router = express.Router();
var User = require("../models/user");
var mongoose = require("mongoose");
var multer = require("multer");
var passport = require("passport");
mongoose.Promise = require('bluebird');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage });

//SHOW - Display User Profile
router.get("/", function(req, res) {
    //Shows the data of the current user
    res.render("profile");
})

//UPDATE - Update User Profile
router.post("/:id", function(req, res) {
    //Capture new data
    var newUsername = req.body.username;
    var newEmail    = req.body.email;

    var updateProfile = { username: newUsername, email: newEmail };

    User.findByIdAndUpdate(req.params.id, updateProfile, function(err, update){
    	if(err){
    		console.log(err)
    	} else {
    		res.redirect("profile")
    		console.log(newUsername)
    		console.log(newEmail)
    		console.log(updateProfile)
    		console.log(req.body)
    		console.log(req.params.id)
    	}
    })
    
})



module.exports = router;














































//Middleware 
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
}