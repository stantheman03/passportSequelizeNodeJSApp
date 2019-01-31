var express = require("express");
var app = express()
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var env  = require("dotenv");
var exphbs = require("express-handlebars");
LocalStrategy = require("passport-local").Strategy;

// Body Parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Passport
app.use(session({secret: "secret", resave:true, saveUninitialized:true}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.session());
app.get("/",function(req,res){
    res.send("Welcome to Passport Authentication App with sequleze")
})

// Models
var models = require("./app/models")

// Routes
var authRoute = require("./app/routes/auth.js")(app.passport);

// handlebars
app.set("views", "./app/views")
app.engine("hbs",exphbs({
    extname: '.hbs'
}))

// Load passport  strategy
require("./app/config/passport/passport.js")(passport,models.user);

// sync database
models.sequelize.sync().then(function(){
    console.log("Database is working")
}).catch(function(err){
    console.log(err, "something went wrong with database")
})

// listen app at port 5000
app.listen(5000,function(err){
    if(!err)
    console.log("app is working")
    else console.log(err)
})