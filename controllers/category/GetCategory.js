

const GetCategory = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const sql = "SELECT * FROM category WHERE id = ?";

        global.db.get(sql, [categoryId], (err, row) => {
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

            if (!row) {
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
                data: row
            });
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
};

module.exports = GetCategory;
