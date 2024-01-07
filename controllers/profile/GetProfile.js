const GetProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const sql = "SELECT * FROM users WHERE id = ?";

        global.db.get(sql, [userId], (err, row) => {
            if (err) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: err.message,
                }
                return res.redirect(`/dashboard`);
            }

            return res.json({
                status: 200,
                success: true,
                data: row
            });
        });
    } catch (error) {
        req.session.message = {
            success: false,
            type: 'error',
            message: 'Internal server error!'
        }
        return res.redirect(`/dashboard`);
    }
};

module.exports = GetProfile;