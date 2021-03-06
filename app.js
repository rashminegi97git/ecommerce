const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser")

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const prodRoute = require("./routes/product");
const catRoute = require("./routes/category");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

app.use(session({
    secret: 'learn env',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect('mongodb://localhost/ecommerceDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);  

const User = require("./models/user");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", prodRoute);
app.use("/api", catRoute);

app.listen(3000, function()
{
    console.log("Listening on port 3000");
})

