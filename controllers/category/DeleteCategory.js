const DeleteCategory = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const sql = "DELETE FROM category WHERE id = ?";

        global.db.run(sql, [categoryId], function (err) {
            if (err) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: err.message,
                }
                return res.redirect('/categories');
            }

            if (this.changes === 0) {
                return res.json({
                    status: 300,
                    success: false,
                    error: {
                        message: "Category not found",
                    },
                });
            }

            req.session.message = {
                success: true,
                type: 'success',
                message: 'Category deleted successfully!'
            }
            return res.redirect('/categories');
        });
    } catch (error) {
        req.session.message = {
            success: false,
            type: 'error',
            message: 'Internal server error!'
        }
        res.redirect('/categories');
    }
};

module.exports = DeleteCategory
