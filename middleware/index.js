// all middlware goes here
var Doggo   = require('../models/doggo');
var Comment = require('../models/comment');

var middlewareObj = {};

// middleware for edit and delete operations
middlewareObj.checkDoggoOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        // does the user own the Doggo
        Doggo.findById(req.params.id, function(err, foundDoggo) {
            if (err) {
                req.flash("error", "Doggo not found.");
                console.log("Hey man, there was some error when looking for the Doggo")
                console.log(err);
                res.redirect("back");
            } else {
                // does the user own the Doggo
                if (foundDoggo.author.id.equals(req.user._id)) {
                    next()
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                } 
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }    
}

// middleware for edit and delete operations
middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        // does the user own the Doggo
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                console.log("Hey man, there was some error when looking for the comment")
                console.log(err);
                res.redirect("back");
            } else {
                // does the user own the comment
                if (foundComment.author.id.equals(req.user._id)) {
                    console.log("Author is found. Calling next.")
                    next();
                } else {
                    console.log("You're not allowed to be here.")
                    res.redirect("back");
                } 
            }
        });
    } else {
        console.log("There was an error, user was not logged in.")
        res.redirect("back");
    }    
}

// middleware check if user is logged in 
middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;