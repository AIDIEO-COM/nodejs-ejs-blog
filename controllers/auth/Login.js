
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const sql = 'SELECT * FROM users WHERE email = ? AND password = ?'

        global.db.get(sql, [email, password], (err, row) => {
            if (err) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: err.message,
                }
                return res.redirect('/blog/add');
            }

            req.session.message = {
                success: true,
                type: 'success',
                message: 'Logged in successfully!'
            }
            res.redirect('/dashboard');
        });
    } catch (error) {
        req.session.message = {
            success: false,
            type: 'error',
            message: 'Internal server error!'
        }
        res.redirect('/blog/add');
    }
}

module.exports = Login