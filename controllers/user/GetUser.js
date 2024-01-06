const GetUser = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const sql = "SELECT * FROM user WHERE id = ?";

        global.db.get(sql, [categoryId], (err, row) => {
            if (err) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: err.message,
                }
                return res.redirect(`/setting/${categoryId}`);
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
        return res.redirect(`/setting/${categoryId}`);
    }
};

module.exports = GetUser;