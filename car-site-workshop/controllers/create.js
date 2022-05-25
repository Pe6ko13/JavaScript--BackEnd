module.exports = {
    get(req, res) {
        res.render('create', { title: 'Add Car' });
    },
    async post(req, res) {
        const car = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl || undefined,
            price: Number(req.body.price),
            owner: req.session.user.id,
        };

        try {
            await req.storage.createCar(car);
            res.redirect('/');
        } catch (err) {
            if (err.name == 'ValidationError') {
                err = Object.values(err.errors).map((e) => ({
                    msg: e.message,
                }));
            }
            res.render('create', { title: 'Add Car', err });
        }
    },
};
