const AuthenticateUser = (req, res, next) => {
    // You can implement more robust authentication logic here
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

module.exports = AuthenticateUser