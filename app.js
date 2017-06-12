var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");
var seeddb = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");
var exsession = require("express-session");

//Require Routes
var campgroundsRoutes = require("./routes/campgrounds.js");
var commentsRoutes = require("./routes/comments.js");
var indexRoutes = require("./routes/index.js");

mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
// seeddb();

//passport configuration
app.use(exsession({
    secret: "This is a cool project",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use(indexRoutes);
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/comments', commentsRoutes);







app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelpcamp Started!");
})