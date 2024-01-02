
const UpdateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body; // Assuming you're sending updated data in the request body

    try {
        const sql = "UPDATE category SET name = ? WHERE id = ?";

        global.db.run(sql, [name, categoryId], function (err) {
            if (err) {
                return res.json({
                    status: 300,
                    success: false,
                    error: {
                        code: "SQLITE_ERROR",
                        message: err.message,
                    },
                });
            }

            if (this.changes === 0) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: 'Category not found or no changes made!'
                }
                return res.redirect(`/category/edit/${categoryId}`);
            }

            req.session.message = {
                success: true,
                type: 'success',
                message: 'Category updated successfully!'
            }
            return res.redirect(`/category/edit/${categoryId}`);
        });
    } catch (error) {
        req.session.message = {
            success: false,
            type: 'error',
            message: 'Internal server error!'
        }
        res.redirect(`/category/edit/${categoryId}`);
    }
};

module.exports = UpdateCategory
