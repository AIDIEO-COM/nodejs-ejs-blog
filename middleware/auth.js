const config = require("../utils/config");
const verifyToken = require("../utils/verifyToken");

const auth = (isPost) => async (req, res, next) => {
    try {

        let token;

        if (!isPost) {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: 'Unauthorized access.',
                };
                return res.redirect('/login');
            }

            // Getting token
            token = authHeader.split(' ')[1];
        } else {
            token = req.body.token;
        }

        // checking if token is there
        if (!token) {

            // setting user info null
            req.session.user = null;
            req.session.isAuthenticated = false;
            req.session.token = null;

            req.session.message = {
                success: false,
                type: 'error',
                message: 'Invalid access.',
            };
            return res.redirect('/login');
        }

        // Verify token
        let verifiedUser = null;
        verifiedUser = verifyToken(token, config.TOKEN_SECRET);
        req.user = verifiedUser; // email, name, id, 

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = auth;
