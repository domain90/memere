var express = require("express");
var app = express();
var router = express.Router({mergeParams: true});
var Gag = require("../models/gags.js");
var Comment = require("../models/comments.js");
//====================================
//COMMENTS
//====================================
router.get("/new", function(req, res) {
    //Find by ID
     Gag.findById(req.params.id, function(err, gag){
         if(err){
             console.log(err);
         } else {
              res.render("comments/new", {gag1: gag});
         }
     })
   
})

//Create comments
router.post("/", isLoggedIn, function(req, res) {
    //Lookup gag using ID
    Gag.findById(req.params.id, function(err, gag){
         if(err){
             console.log(err);
             res.redirect("/gags")
         } else {
             //Create new comment
              Comment.create(req.body.comment, function(err, comment){
                  if(err){
                      console.log(err)
                  } else {
                      comment.author.id = req.user._id;
                      comment.author.username = req.user.username;
                      console.log(req.user.username);
                      //Connect new comment to gag
                      comment.save();
                      gag.comments.push(comment)
                      gag.save()
                      //Redirect
                      res.redirect('/gags/' + gag._id)
                  }
              })
         }
     })
})

//Reply to Comment
router.post("/comment/:id/reply", isLoggedIn, function(req, res){
  //Look up parent comment
    Comment.findById(req.params.id, function(err, parentComment){
      if (err) {
        console.log(err);
      } else {
        parentId = parentComment._id;
        Comment.create(req.body.comment, function(err, reply){
        if(err) {
          console.log(err);
        } else {
          reply.id = new ObjectId();
          reply.author.id = req.user.id;
          reply.author.username = req.user.username;
          parentComment.parents.push(parentId);
          reply.parents = parentComment.parents;
          reply.save();
          gag.comments.push(reply)
          gag.save()
          //
          res.redirect('/gags/' + gag._id)
        }
      })
    }   
  })
})




app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})
//Middleware 
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;