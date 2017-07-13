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
router.get("/profile/:id", function(req, res) {
    //Find corresponded with provided ID 
    User.findById(req.params.id).exec(function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            console.log(foundUser);
        }
    })
})





















































//Middleware 
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
}