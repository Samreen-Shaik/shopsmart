const express = require("express");
const router = express.Router();
const models = require("../models/schema");

// ✅ Add Product Route for Admin
router.post('/add-product', async (req, res) => {
    try {
        const { productname, description, price, brand, image, category, countInStock, rating, quantity = 1 } = req.body;

        if (!productname || !description || !price || !brand || !image || !category || !countInStock || !rating) {
            return res.status(400).send({ message: 'Missing required fields' });
        }

        const foundCategory = await models.Category.findOne({ category });
        if (!foundCategory) {
            return res.status(404).send({ message: 'Category not found' });
        }

        const product = new models.Product({
            productname,
            description,
            price,
            brand,
            image,
            category: foundCategory.category, // 👈 Use `.category` if schema uses string
            countInStock,
            rating,
            quantity,
            dateCreated: new Date()
        });

        await product.save();
        res.status(201).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

module.exports = router;
