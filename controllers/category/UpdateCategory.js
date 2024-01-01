
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
                return res.json({
                    status: 300,
                    success: false,
                    error: {
                        message: "Category not found or no changes made",
                    },
                });
            }

            return res.json({
                status: 200,
                success: true,
                message: "Category updated successfully",
            });
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
};

module.exports = UpdateCategory
