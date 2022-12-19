const router = require('express').Router();
const { Post } = require('../../models');
const checkAuth = require('../../utils/auth');

// CREATE POST
router.post('/', checkAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    } catch (err) { res.status(400).json(err) }
});

// DELETE POST BY ID
router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!projectData) {
            res.status(404).json({ message: 'No project found with this ID!' })
            return;
        };

        res.status(200).json(postData)
    } catch (err) { res.status(400).json(err) }
})