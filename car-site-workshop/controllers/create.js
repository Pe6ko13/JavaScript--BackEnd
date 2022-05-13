module.exports = {
    get(req, res) {
        res.render('create', { title: 'Add Car' });
    },
    async post(req, res) {
        const car = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: Number(req.body.price),
        };

        try {
            await req.storage.createCar(car);
            res.redirect('/');
        } catch (err) {
            console.log('Error record');
            res.redirect('/create');
        }
    },
};
