var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds.js");


//INDEX
router.get("/", function(req, res){
    //Get campgrounds
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log("An error has occur");
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
        }
    })
    //res.render("campgrounds", {campgrounds: campgrounds});
})

//NEW - show form to add
router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
})

//CREATE
router.post("/", isLoggedIn, function(req, res){
    //get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var info = req.body.info;
    var author = {
        id: req.user.id,
        username: req.user.username
    }
    var newCamp = {name: name, images: image, info: info, author: author};
    //Save to database
    Campground.create(newCamp, function(err, newlyCamp){
        if(err){
            console.log("An error has occur");
            console.log(err);
        } else {
            //redirect to campgrounds
             res.redirect("/campgrounds");
        }
    })
    
   
})

//SHOW - displays more info about clicked/selected camp
router.get("/:id", function(req, res) {
    //find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //show more info in a template
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
})

//Middleware 
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;