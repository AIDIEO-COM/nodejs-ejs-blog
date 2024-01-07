const fs = require('fs');
const path = require('path');

const DeleteBlog = async (req, res) => {
    const blogId = req.params.id;

    try {
        const sqlSelect = "SELECT * FROM blog WHERE id = ?";
        const sqlDelete = "DELETE FROM blog WHERE id = ?";

        // is there is the specific data
        global.db.get(sqlSelect, [blogId], function (err, row) {
            if (err) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: err.message,
                }
                return res.redirect('/blogs');
            }

            if (!row) {
                req.session.message = {
                    success: false,
                    type: 'error',
                    message: 'Cant find the blog!',
                }
                return res.redirect('/blogs');
            }

            // delete query
            global.db.run(sqlDelete, [blogId], function (err) {
                if (err) {
                    req.session.message = {
                        success: false,
                        type: 'error',
                        message: err.message,
                    }
                    return res.redirect('/blogs');
                }

                // Remove the corresponding file from the public/files folder
                const filePath = path.join(__dirname, '../../public/files', row.image);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });

                // send respone with session
                req.session.message = {
                    success: true,
                    type: 'success',
                    message: 'Blog deleted successfully!'
                }
                return res.redirect('/blogs');
            });
        })
    } catch (error) {
        req.session.message = {
            success: false,
            type: 'error',
            message: 'Internal server error!'
        }
        res.redirect('/blogs');
    }
};

module.exports = DeleteBlog
