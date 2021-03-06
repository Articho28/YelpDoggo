var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

// LANDING PAGE
router.get("/", function(req, res) {
    res.render("landing");
});

// ===========
// AUTH ROUTES
// ===========

//show the register form
router.get("/register", function(req, res) {
    res.render("register");
});

//handle sign-Up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username)
            res.redirect("/doggos");
        });
    });
});

// show login form
router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/doggos",
    failureRedirect: "/login"
}), function(req, res) {
    //callback not rlly needed, all is done in middleware
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/doggos");
});

module.exports = router;