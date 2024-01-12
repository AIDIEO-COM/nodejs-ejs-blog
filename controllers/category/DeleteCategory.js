const DeleteCategory = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const sql = "DELETE FROM category WHERE id = ?";

        global.db.run(sql, [categoryId], function (err) {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    success: false,
                    message: 'Category not found or cannot be deleted due to references.'
                });
            }

            return res.status(200).json({
                status: 200,
                success: true,
                message: 'Category deleted successfully!'
            });
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Server error!',
        });
    }
};

module.exports = DeleteCategory
