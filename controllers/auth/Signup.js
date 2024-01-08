const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken');
const tableQueries = require('../../utils/tables');

const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const sql = 'SELECT * FROM users WHERE email = ?'

        global.db.get(sql, [email], async (err, row) => {
            if (err) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: err.message,
                }
                return res.redirect('/signup');
            }

            // if  user found with the email
            if (row) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: 'User already exists.',
                }
                return res.redirect('/signup');
            }

            const hashedPassword = await bcrypt.hashSync(password, 10);

            global.db.run(tableQueries.userInsertQuery, [name, email, hashedPassword], (err, row) => {
                if (err) {
                    req.session.message = {
                        success: false,
                        type: 'error',
                        message: err.message,
                    }
                    return res.redirect('/signup');
                }

                global.db.get(sql, [email], async (err, row) => {
                    if (err) {
                        req.session.message = {
                            success: false,
                            type: 'error',
                            message: err.message,
                        }
                        return res.redirect('/signup');
                    }

                    // token
                    const token = generateToken(row);

                    // Set user information in the session
                    req.session.user = {
                        name: row.name,
                        email: row.email,
                    };
                    req.session.isAuthenticated = true;
                    req.session.token = token;

                    req.session.message = {
                        success: true,
                        type: 'success',
                        message: 'Signup successfully!'
                    }
                    return res.redirect('/dashboard');
                });
            });
        });
    } catch (error) {
        req.session.message = {
            success: false,
            type: 'error',
            message: 'Internal server error!'
        }
        res.redirect('/signup');
    }
}

module.exports = Signup