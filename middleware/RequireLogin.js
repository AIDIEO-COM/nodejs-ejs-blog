const RequireLogin = (req, res, next) => {
    if (req.session.user && req.session.isAuthenticated) {
        next(); // User is logged in, proceed to the next middleware or route handler
    } else {
        res.redirect('/login'); // Redirect to login page if not logged in
    }
}

module.exports = RequireLogin