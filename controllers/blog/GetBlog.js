const GetBlog = async (req, res) => {
    const blogId = req.params.id;

    try {
        const sql = `
        SELECT blog.*, category.name AS category_name
        FROM blog
        INNER JOIN category ON blog.category_id = category.id
        WHERE blog.id = ?
    `;

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