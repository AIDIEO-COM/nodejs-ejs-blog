const DeleteBlog = async (req, res) => {
    const blogId = req.params.id;

    try {
        const sql = "DELETE FROM blog WHERE id = ?";

        global.db.run(sql, [blogId], function (err) {
            if (err) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: err.message,
                }
                return res.redirect('/blogs');
            }

            if (this.changes === 0) {
                return res.json({
                    status: 300,
                    success: false,
                    error: {
                        message: "Blog not found",
                    },
                });
            }

            req.session.message = {
                success: true,
                type: 'success',
                message: 'Blog deleted successfully!'
            }
            return res.redirect('/blogs');
        });
    } catch (error) {
        req.session.message = {
            success: false,
            type: 'error',
            message: 'Internal server error!'
        }
        res.redirect('/blogs');
    }
};

module.exports = DeleteBlog
