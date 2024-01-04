const GetBlog = async (req, res) => {
    const blogId = req.params.id;

    try {
        const sql = "SELECT * FROM blog WHERE id = ?";

        global.db.get(sql, [blogId], (err, row) => {
            if (err) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: err.message,
                }
                return res.redirect(`/blog/edit/${blogId}`);
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
        return res.redirect(`/blog/edit/${categoryId}`);
    }
};

module.exports = GetBlog;