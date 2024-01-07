
const Logout = async (req, res) => {
    try {
        // setting user info null
        req.session.user = null;
        req.session.isAuthenticated = false;
        req.session.token = null;

        // info message
        req.session.message = {
            success: true,
            type: 'success',
            message: 'Logged out successfully!',
        };
        res.redirect('/login');
    } catch (error) {
        req.session.message = {
            success: false,
            type: 'error',
            message: 'Internal server error!'
        }
        res.redirect('/login');
    }
}

module.exports = Logout