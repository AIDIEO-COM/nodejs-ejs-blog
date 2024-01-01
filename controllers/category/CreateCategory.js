
const CreateCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const sql = "INSERT INTO category(name) VALUES (?)";

        global.db.run(sql, [name], (err) => {
            if (err) {
                return res.json({
                    status: 300,
                    success: false,
                    error: {
                        code: "SQLITE_ERROR",
                        message: "Error executing SQL query",
                        details: err.message, // Include the error message for more information
                    },
                });
            }

            return res.json({
                status: 200,
                success: true,
            });
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
}

module.exports = CreateCategory