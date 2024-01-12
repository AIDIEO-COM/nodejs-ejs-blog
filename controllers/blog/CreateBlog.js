
const CreateBlog = async (req, res) => {

    const userId = req.user.id;

    try {
        const { title, author, description, category_id } = req.body;
        const sql = "INSERT INTO blog (title, author, image, content, user_id, category_id) VALUES (?, ?, ?, ?, ?, ?)";

        global.db.run(sql, [title, author, req.file.filename, description, userId, category_id], (err) => {
            if (err) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: err.message,
                }
                return res.redirect('/blog/add');
            }

            req.session.message = {
                success: true,
                type: 'success',
                message: 'Blog added successfully!'
            }
            res.redirect('/blog/add');
        });
    } catch (error) {
        req.session.message = {
            success: false,
            type: 'error',
            message: 'Internal server error!'
        }
        res.redirect('/blog/add');
    }
}

module.exports = CreateBlog