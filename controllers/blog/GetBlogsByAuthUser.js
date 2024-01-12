
const GetBlogsByAuthUser = async (req, res) => {

    const userId = req.user.id;

    try {
        const sql = `
        SELECT blog.*, category.name AS category_name
        FROM blog
        INNER JOIN category ON blog.category_id = category.id
        WHERE blog.user_id = ?;
    `;

        global.db.all(sql, [userId], (err, rows) => {
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
                data: rows || []
            });
        });
    } catch (error) {
        return res.json({
            status: 500,
            success: false,
        });
    }
}

module.exports = GetBlogsByAuthUser