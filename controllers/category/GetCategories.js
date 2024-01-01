
const GetCategories = async (req, res) => {
    try {
        const sql = "SELECT * FROM category";

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

            if (rows.length < 1) {
                return res.json({
                    status: 300,
                    success: false,
                    error: {
                        message: "No Match",
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

module.exports = GetCategories