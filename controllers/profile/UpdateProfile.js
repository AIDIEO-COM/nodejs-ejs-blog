const bcrypt = require('bcrypt');

const UpdateProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, password } = req.body;

    try {
        const sqlSelect = "SELECT * FROM users WHERE id = ?";
        const sqlUpdate = "UPDATE users SET name = ?, password = ? WHERE id = ?";

        // Check if the user exists
        global.db.get(sqlSelect, [userId], async function (err, row) {
            if (err) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: err.message,
                };
                return res.redirect('/dashboard');
            }

            if (!row) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: 'Can\'t find the user!',
                };
                return res.redirect('/dashboard');
            }

            // Hash the password if it's provided
            const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

            // Check if the password field is provided
            const params = hashedPassword ? [name, hashedPassword, userId] : [name, userId];

            // Perform the update
            global.db.run(sqlUpdate, params, function (err) {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        error: {
                            code: "SQLITE_ERROR",
                            message: err.message,
                        },
                    });
                }

                req.session.message = {
                    success: true,
                    type: 'success',
                    message: 'Profile updated successfully!',
                };
                return res.redirect('/dashboard');
            });
        });
    } catch (error) {
        req.session.message = {
            success: false,
            type: 'error',
            message: 'Internal server error!',
        };
        res.redirect('/dashboard');
    }
};

module.exports = UpdateProfile;