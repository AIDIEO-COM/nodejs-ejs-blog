const bcrypt = require('bcrypt');

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const sql = 'SELECT * FROM users WHERE email = ?'

        global.db.get(sql, [email], async (err, row) => {
            if (err) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: err.message,
                }
                return res.redirect('/login');
            }

            // if no user found with the email
            if (!row) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: 'User not exists.',
                }
                return res.redirect('/login');
            }

            // checking is password matched
            const isMatched = await bcrypt.compare(password, row.password);

            if (!isMatched) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: 'Password not matched.',
                }
                return res.redirect('/login');
            }

            // Set user information in the session
            req.session.user = {
                name: row.name,
                email: row.email,
            };
            req.session.isAuthenticated = true;

            req.session.message = {
                success: true,
                type: 'success',
                message: 'Logged in successfully!'
            }
            return res.redirect('/dashboard');
        });
    } catch (error) {
        req.session.message = {
            success: false,
            type: 'error',
            message: 'Internal server error!'
        }
        res.redirect('/login');
    }
}

module.exports = Login