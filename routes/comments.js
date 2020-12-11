var express = require('express');
var router = express.Router({mergeParams: true});
var Doggo = require('../models/doggo');
var Comment = require('../models/comment');
var middleware = require('../middleware');


// Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    //find Doggo by id
    Doggo.findById(req.params.id, function(err, doggo) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {doggo: doggo})
        }
    })
});

// Comments create
router.post("/", middleware.isLoggedIn,  function(req, res) {
    //lookup Doggo using ID
    Doggo.findById(req.params.id, function (err, doggo) {
        if (err) {
            console.log(err);
            // show error message later
            res.redirect("/doggos");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    req.flash("error", "Something went wrong.");
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //add comment to doggo
                    doggo.comments.push(comment);
                    doggo.save();
                    req.flash("success", "Succesfully added comment.")
                    res.redirect("/doggos/" + doggo._id)
                }
            })

        }
    });
});

// COMMENT EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            // Note: req.params.id is doggo id.
            res.render("comments/edit", { doggo_id: req.params.id, comment: foundComment})
        }
    });
})

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            req.flash("error", "You don't have permission to do that.");
            res.redirect("back");
        } else {
            res.redirect("/doggos/" + req.params.id);
        }
    });
})

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndDelete(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
            req.flash("error", "You don't have permission to do that.");
        } else {
            res.redirect("/doggos/" + req.params.id);
        }
    });
});

module.exports = router;