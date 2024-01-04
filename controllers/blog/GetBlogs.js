
const GetBlogs = async (req, res) => {
    try {
        const sql = `
        SELECT blog.*, category.name AS category_name
        FROM blog
        INNER JOIN category ON blog.category_id = category.id
    `;

        global.db.all(sql, [], (err, rows) => {
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

            return res.json({
                status: 200,
                success: true,
                data: rows
            });
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
}

module.exports = GetBlogs