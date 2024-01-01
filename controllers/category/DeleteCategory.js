const DeleteCategory = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const sql = "DELETE FROM category WHERE id = ?";

        global.db.run(sql, [categoryId], function (err) {
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
                return res.json({
                    status: 300,
                    success: false,
                    error: {
                        message: "Category not found",
                    },
                });
            }

            return res.json({
                status: 200,
                success: true,
                message: "Category deleted successfully",
            });
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
};

module.exports = DeleteCategory
