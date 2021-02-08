const { Router } = require('express');
const config = require('config');
const Link = require('../models/Link');

const router = Router();

router.get(
    '/*',
    async (req, res) => {
        try {
            const url = config.get('baseUrl') + req.originalUrl;
            const link = await Link.findOne({ short: url });

            if (link) {
                return res.redirect(link.initial);
            }

            return res.status(404).json({ message: 'Page not found' });
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
);

module.exports = router;