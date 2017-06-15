var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/gags.js");
var Comment = require("../models/comments.js");
//====================================
//COMMENTS
//====================================
router.get("/new", isLoggedIn, function(req, res) {
    //Find by ID
     Campground.findById(req.params.id, function(err, campground){
         if(err){
             console.log(err);
         } else {
              res.render("comments/new", {campground1: campground});
         }
     })
   
})

//Create comments
router.post("/", isLoggedIn, function(req, res) {
    //Lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
         if(err){
             console.log(err);
             res.redirect("/campgrounds")
         } else {
             //Create new comment
              Comment.create(req.body.comment, function(err, comment){
                  if(err){
                      console.log(err)
                  } else {
                      comment.author.id = req.user.id;
                      comment.author.username = req.user.username;
                      //Connect new comment to campground
                      comment.save();
                      campground.comments.push(comment)
                      campground.save()
                      //Redirect
                      res.redirect('/campgrounds/' + campground._id)
                  }
              })
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