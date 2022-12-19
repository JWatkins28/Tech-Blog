const router = require('express').Router();
const { Comment } = require('../../models');
const checkAuth = require('../../utils/auth');

// CREATE COMMENT
router.post('/', checkAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({...req.body, commenter: req.session.user_name});
        res.status(200).json(newComment);
    } catch (err) { res.status(400).json(err) }
});

// DELETE COMMENT BY ID
router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({where: {id: req.params.id,}});

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this ID!' })
            return;
        };

        res.status(200).json(commentData)
    } catch (err) { res.status(400).json(err) }
});

module.exports = router;