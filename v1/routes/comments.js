var express = require("express");
var router = express.Router({mergeParams: true});
var Gag = require("../models/gags.js");
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

// router.post("/gags/:id", function(req, res){
//     Gag.findById(req.params.id, function(err, gag){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("It works");
//         }
//     })
// })


router.post("/gags/:id", isLoggedIn, function(req, res) {
    //Lookup campground using ID
    Gag.findById(req.params.id, function(err, gag){
        if(err){
           console.log(err);
        } else {
          // console.log(gag._id)
          // Create new comment
          Comment.create(req.body.comment, function(err, comment){
            if(err){
                console.log(err)
            } else {
                comment.author.id = req.user.id;
                comment.author.username = req.user.username;
                //Connect new comment to campground
                comment.save();
                gag.comments.push(comment)
                gag.save()
                //Redirect
                res.redirect('/gags/' + gag._id)
                console.log("It's saved")
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