var models = require("../../app/models")
var express = require("express");
var app = express()
var authController = require("../controllers/authcontroller.js");

module.exports = function(app, passport){
    // GET
    app.get("/signup",authController.signup)
    app.get("/signin",authController.signin)
    app.get("/dashboard",authController.dashboard)
    app.get("/logout",authController.logout)
    // POST
    app.post("/signin", passport.authenticate("local-signin",{
        succesRedirect:"/dashbaord",
        failureRedirect: "/signin"
    }
    ));
    app.post("/signup",passport.authenticate("local-signup",{
        succesRedirect:"/dashboard",
        failureRedirect:'/signup'
    }
    ));

    function isLoggedIn(req,res,next){
        if(req.isAuthenticated())
        return next();

        res.redirect('/signin')
    }
}