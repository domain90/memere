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
    console.log(currentUser._id)
})

//UPDATE - Update User Profile
router.post("/:id", function(req, res) {
    //Shows the data of the current user
   console.log(req.params.id)
    
})



module.exports = router;














































//Middleware 
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
}