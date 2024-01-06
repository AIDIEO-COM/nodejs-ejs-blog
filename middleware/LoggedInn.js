const LoggedIn = (req, res, next) => {
    if (req.session.user && req.session.isAuthenticated) {
        res.redirect('/dashboard'); // Redirect to dashboard page if logged in
    } else {
        next();
    }
}

module.exports = LoggedIn