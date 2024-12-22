const User= require("../models/user")

module.exports.renderSignupForm= (req,res) => {
    res.render("users/signup.ejs");
}


module.exports.signup= async(req,res,next) => {
    try {
        let {username, email, password}= req.body;
        const newUser= new User({username, email});
        const registeredUser= await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to wanderlust!");
            return res.redirect("/listings");
        })
    } catch(e) {
        req.flash("error", e.message);
        return res.redirect("/signup");
    }
}

module.exports.renderLoginForm= (req,res) => {
    res.render("users/login.ejs");
}

module.exports.login= async(req,res) => {
    req.flash("success", "Welcome back to wanderlust!");
    let redirectUrl= res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout= (req,res,next) => {
    req.logOut((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "logged you out!");
        return res.redirect("/listings");
    });
}