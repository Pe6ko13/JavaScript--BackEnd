const { INSPECT_MAX_BYTES } = require('buffer');
const { getById } = require('../services/furniture');

module.exports = () => async (req, res, next) => {
    const id = req.params.id;
    try {
        const item = await getById(id).lean();
        item._ownerId = item.owner;
        res.locals.item = item;

        next();
    } catch (err) {
        res.status(404).json({ message: 'Record not found' });
    }
};
