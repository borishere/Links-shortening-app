const { Router } = require('express');
const config = require('config');
const Link = require('../models/Link');
const { nanoid } = require('nanoid');
const auth = require('./middleware/authMiddleware');

const router = Router();

router.post(
    '/shorten',
    async (req, res) => {
        try {
            const { initialLink, userId } = req.body;
            const shortUrl = `${config.get('baseUrl')}/w/${nanoid(7)}`;

            const link = new Link({
                initial: initialLink,
                short: shortUrl,
                owner: userId
            });

            await link.save();

            res.json(link);
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
);

router.get(
    '/',
    auth,
    async (req, res) => {
        try {
            if (req.user && req.user.userId) {
                const links = await Link.find({ owner: req.user.userId });
                res.json(links);
            } else if (req.authError) {
                res.status(500).json({ message: req.authError.message });
            }
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
);

router.get(
    '/:id',
    auth,
    async (req, res) => {
        try {
            if (req.user && req.user.userId) {
                const link = await Link.find({ _id: req.params.id });
                res.json(link);
            } else if (req.authError) {
                res.status(500).json({ message: req.authError.message });
            }
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
);

module.exports = router;