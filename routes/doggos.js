var express = require('express');
var router = express.Router();
var Doggo = require('../models/doggo');
var middleware = require('../middleware');

// ROUTES

// SHOW ALL DOGGOS
router.get("/", function(req, res) {
    //get all Doggos from db and render
    Doggo.find({}, function(err, allDoggos) {
        if (err) {
            console.log(err);
        } else { 
            res.render("doggos/index.ejs", {doggos: allDoggos});
        }
    })
    //res.render("Doggos", {Doggos: Doggos});
});

// POST ROUTE TO CREATE Doggo
router.post("/", middleware.isLoggedIn, function(req, res) {
    //get data from form and add to camgrounds array
    var doggoName = req.body.name;
    var doggoImage = req.body.image;
    var doggoPrice = req.body.price;
    var doggoDesc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newDoggo = { name : doggoName, price: doggoPrice, image : doggoImage, description: doggoDesc, author: author };

    //create new Doggo and save to db
    Doggo.create(newDoggo, function(err, newInstance) {
        if (err) {
            console.log(err);
        } else {
            console.log(newInstance)
            res.redirect("/doggos");
        }
    });
});


// NEW - show form to create new Doggo
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("doggos/new.ejs");
})

// SHOW ROUTE
router.get("/:id", function(req, res) {
    // Show Doggos the comment is only the reference to it, so we need to populate
    Doggo.findById(req.params.id).populate("comments").exec(function(err, foundDoggo) {
        if (err) {
            console.log("Hey man this is causing issues inside show route of Doggos")
            console.log(err);
        } else {
            res.render("doggos/show", {doggo: foundDoggo});
        }
    });
});

// EDIT Doggo ROUTE
router.get("/:id/edit", middleware.checkDoggoOwnership, function(req, res) {
    // only allow edit if user is logged in
    Doggo.findById(req.params.id, function(err, foundDoggo) {
        res.render("doggos/edit", { doggo: foundDoggo })
    });
}); 

// UPDATE Doggo ROUTE
router.put("/:id", middleware.checkDoggoOwnership, function(req, res) {
    // find an update the correct Doggo
    Doggo.findByIdAndUpdate(req.params.id, req.body.doggo, function(err, updatedDoggo) {
        if (err) {
            res.redirect("/doggos");
        } else {
            res.redirect("/doggos/" + req.params.id);
        }
    })
});

// DESTROY Doggo ROUTE
router.delete("/:id", middleware.checkDoggoOwnership, function(req ,res) {
    Doggo.findByIdAndRemove(req.params.id, function(err) {
        // error handling here is just boilerplate
        if (err) {
            res.redirect("/Doggos");
        } else {
            res.redirect("/Doggos");
        }
    })
});

module.exports = router;