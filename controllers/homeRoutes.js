const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const checkAuth = require('../utils/auth');

// HOMEPAGE RENDER
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({ include: [{ model: User, attributes: ['name'] }] });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });

    } catch (err) { res.status(500).json(err) }
});

// GET POST BY ID
router.get('/post/:id', checkAuth, async (req, res) => {
    try {
        // GRAB ALL COMMENTS FOR THIS POST ID
        const commentCheck = await Comment.findAll({ where: { post_id: req.params.id } });
        let postData;
        // SEE IF COMMENTS EXIST - IF THEY DON'T GRAB ALL POSTS WITHOUT COMMENT MODEL
        if (!commentCheck.length) {
            postData = await Post.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: ['name']
                    }
                ]
            });
        // IF IT DOES HAVE COMMENTS, GRAB ALL POSTS WITH COMMENTS WITH ATTACHED COMMENTS
        } else {
            postData = await Post.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: ['name']
                    },
                    {
                        model: Comment,
                        where: {
                            post_id: req.params.id
                        }
                    }
                ]
            });
        }

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in,
        });

    } catch (err) { res.status(500).json(err) }
});

// ADD POST RENDER
router.get('/add', checkAuth, async (req, res) => {
    try {

        res.render('addpost', { logged_in: req.session.logged_in });

    } catch (err) { res.status(400).json(err) }
});

// EDIT POST RENDER
router.get('/post/:id/edit', checkAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id)

        const post = postData.get({ plain: true });

        res.render('editpost', {
            ...post,
            logged_in: req.session.logged_in,
        })

    } catch (err) { res.status(400).json(err) }
});

// DASHBOARD RENDER
router.get('/dashboard', checkAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }]
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });

    } catch (err) { res.status(500).json(err) }
});

// LOGIN RENDER/REDIRECT
router.get('/login', (req, res) => {

    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login')
});

// SIGN UP RENDER/REDIRECT
router.get('/signup', (req, res) => {

    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('signup')
});

module.exports = router;