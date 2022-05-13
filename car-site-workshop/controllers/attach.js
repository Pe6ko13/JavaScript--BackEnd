module.exports = {
    async get(req, res) {
        const id = req.params.id;

        try {
            const [car, accessories] = await Promise.all([
                req.storage.getById(id),
                req.accessory.getAll(),
            ]);

            res.render('attachAccessory', {
                title: 'Attach Accessory',
                car,
                accessories,
            });
        } catch (err) {
            res.redirect('/404');
        }
    },
    async post(req, res) {},
};
