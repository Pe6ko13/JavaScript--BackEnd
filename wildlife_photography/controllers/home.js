const { isUser } = require('../middleware/guards');
const { getPost, getPostById, getPostByAuthor } = require('../services/post');
const { postViewModel } = require('../util/mappers');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

router.get('/catalog', async (req, res) => {
    const posts = (await getPost()).map(postViewModel);
    res.render('catalog', { title: 'Catalog page', posts });
});

router.get('/catalog/:id', async (req, res) => {
    const id = req.params.id;
    const post = postViewModel(await getPostById(id));

    if (req.session.user) {
        post.hasUser = true;
        if (req.session.user._id == post.author._id) {
            post.isAuthor = true;
        } else {
            console.log(post.votes);
            post.hasVotes =
                post.votes.find((v) => v._id == req.session.user._id) !=
                undefined;
        }
    }

    res.render('details', { title: 'Details', post });
});

router.get('/profile', isUser(), async (req, res) => {
    const posts = (await getPostByAuthor(req.session.user._id)).map(
        postViewModel
    );
    res.render('profile', { title: 'My posts', posts });
});

module.exports = router;
