var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require('method-override')
    Doggo          = require("./models/doggo"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds");

var commentRoutes = require('./routes/comments'),
    doggoRoutes = require('./routes/doggos'),
    indexRoutes = require('./routes/index');

// flash setup
app.use(flash());

//moment setup
app.locals.moment = require('moment');

// Passport config
app.use(require("express-session")({
    secret: "Once again, rusty wins",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passes user to every request if he is logged in 
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success")
    next();
});


//mongoose setup
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_doggo");
app.use(bodyParser.urlencoded({extended: true}));

//set view engine to avoid ejs extensions and point towards stylesheets
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Seeds the db
// seedDB();

//use routes
app.use(indexRoutes);
app.use("/doggos", doggoRoutes);
app.use("/doggos/:id/comments", commentRoutes);


// START SERVER
app.listen(3000, function() {
    console.log("YelpDoggo server started at port 3000.");
});