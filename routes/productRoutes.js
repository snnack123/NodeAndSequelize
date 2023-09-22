const db = require('../app/models/index.js');
const express = require('express');
const { verifyToken } = require('../utils/middlewares.js');

const router = express.Router();
const Product = db.Product;

router.post('/products', verifyToken, async (req, res) => {
    try {
        if (!req.body.name || !req.body.sku || !req.body.price || !req.body.categoryId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const product = await Product.create(req.body);
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
