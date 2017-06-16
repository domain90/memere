var express = require("express");
var app = express();
var router = express.Router();
var Gag = require("../models/gags");
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage });

//INDEX
router.get("/", function(req, res){
    //Get campgrounds
    Gag.find({}, function(err, allgags){
        if(err){
            console.log("An error has occur");
            console.log(err);
        } else {
            res.render("gags/index", {Gags: allgags, currentUser: req.user});
        }
    })
    //res.render("campgrounds", {campgrounds: campgrounds});
})

//NEW - show form to add
router.get("/new", isLoggedIn, function(req, res) {
    res.render("gags/new");
})

app.use(isLoggedIn);
//CREATE
router.post("/", upload.single('gag'), function(req, res){
    //get data from form and add to array
    var title = req.body.title;
    var image = "/uploads/" + req.file.filename;
    var info = req.body.info;
    var author = {
        id: req.user.id,
        username: req.user.username
    }
    var newGag = {title: title, images: image, info: info, author: author};
    //Save to database
    Gag.create(newGag, function(err, newlyGag){
        if(err){
            console.log("An error has occur");
            console.log(err);
        } else {
            //redirect to index
            console.log(image)
            res.redirect("/");
        }
    })
    
   
})

//SHOW - displays more info about clicked/selected camp
router.get("/gag/:id", function(req, res) {
    //find campground with provided ID
    Gag.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //show more info in a template
            res.render("gags/show", {campground: foundCampground});
        }
    })
})

//Middleware 
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
}

module.exports = router;