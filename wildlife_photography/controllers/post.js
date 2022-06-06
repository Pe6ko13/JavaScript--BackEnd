const { isUser } = require('../middleware/guards');
const {
    createPost,
    getPostById,
    updatePost,
    deletePost,
    vote,
} = require('../services/post');
const { mapErrors, postViewModel } = require('../util/mappers');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});

router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const post = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
        author: userId,
    };

    try {
        await createPost(post);
        res.redirect('/catalog');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Page', errors, data: post });
    }
});

router.get('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const post = postViewModel(await getPostById(id));

    if (req.session.user._id != post.author._id) {
        return res.redirect('/login');
    }

    res.render('edit', { title: 'Edit post', post });
});

router.post('/edit/:id', isUser(), async (req, res) => {
    const postId = req.params.id;
    const existingPost = postViewModel(await getPostById(postId));

    if (req.session.user._id != existingPost.author._id) {
        return res.redirect('/login');
    }

    const post = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        description: req.body.description,
        image: req.body.image,
    };

    try {
        await updatePost(postId, post);
        res.redirect('/catalog/' + postId);
    } catch (err) {
        post._id = postId;
        const errors = mapErrors(err);
        res.render('edit', { title: 'Edit post', post, errors });
    }
});

router.get('/delete/:id', isUser(), async (req, res) => {
    const postId = req.params.id;
    const existingPost = postViewModel(await getPostById(postId));

    if (req.session.user._id != existingPost.author._id) {
        return res.redirect('/login');
    }

    try {
        await deletePost(postId);
        res.redirect('/catalog');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('details', { title: existingPost.title, errors });
    }
});

router.get('/vote/:id/:type', isUser(), async (req, res) => {
    const id = req.params.id;
    const value = req.params.type == 'upvote' ? 1 : -1;

    try {
        await vote(id, req.session.user._id, value);
        res.redirect('/catalog/' + id);
    } catch (err) {
        const errors = mapErrors(err);
        res.render('details', { title: 'Details', errors });
    }
});

module.exports = router;
