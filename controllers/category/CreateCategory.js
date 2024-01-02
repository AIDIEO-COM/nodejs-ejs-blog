
const CreateCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const sql = "INSERT INTO category(name) VALUES (?)";

        global.db.run(sql, [name], (err) => {
            if (err) {
                // return res.json({
                //     status: 300,
                //     success: false,
                //     error: {
                //         code: "SQLITE_ERROR",
                //         message: err.message,
                //     },
                // });
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: err.message,
                }
                return res.redirect('/categories');
            }

            // const newCategory = response.data;

            // return res.json({
            //     status: 200,
            //     success: true,
            // });
            req.session.message = {
                success: true,
                type: 'success',
                message: 'Category added successfully!'
            }
            res.redirect('/categories');
        });
    } catch (error) {
        // return res.json({
        //     status: 400,
        //     success: false,
        // });
        req.session.message = {
            success: false,
            type: 'error',
            message: 'Internal server error!'
        }
        res.redirect('/categories');
    }
}

module.exports = CreateCategory