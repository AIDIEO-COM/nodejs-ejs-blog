
const CreateCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const sql = "INSERT INTO category(name) VALUES (?)";

        global.db.run(sql, [name], (err) => {
            if (err) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: err.message,
                }
                return res.redirect('/categories');
            }

            req.session.message = {
                success: true,
                type: 'success',
                message: 'Category added successfully!'
            }
            res.redirect('/categories');
        });
    } catch (error) {
        req.session.message = {
            success: false,
            type: 'error',
            message: 'Internal server error!'
        }
        res.redirect('/categories');
    }
}

module.exports = CreateCategory