
const UpdateBlog = async (req, res) => {
    const blogId = req.params.id;
    const { title, author, description, category_id } = req.body;

    console.log(req.body);

    try {
        let sql;
        let params;

        if (req.file) {
            // If req.file exists, update image as well
            sql = "UPDATE blog SET title = ?, author = ?, image = ?, content = ?, category_id = ? WHERE id = ?";
            params = [title, author, req.file.filename, description, category_id, req.params.id];
        } else {
            // If req.file doesn't exist, keep the previous image value
            sql = "UPDATE blog SET title = ?, author = ?, content = ?, category_id = ? WHERE id = ?";
            params = [title, author, description, category_id, req.params.id];
        }

        global.db.run(sql, params, function (err) {
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
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: 'Blog not found or no changes made!'
                }
                return res.redirect(`/blog/edit/${blogId}`);
            }

            req.session.message = {
                success: true,
                type: 'success',
                message: 'Blog updated successfully!'
            }
            return res.redirect(`/blog/edit/${blogId}`);
        });
    } catch (error) {
        req.session.message = {
            success: false,
            type: 'error',
            message: 'Internal server error!'
        }
        res.redirect(`/blog/edit/${blogId}`);
    }
};

module.exports = UpdateBlog
