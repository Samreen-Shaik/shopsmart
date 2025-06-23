const express = require('express');
const router = express.Router();
const User = require('../models/User'); // or wherever your user model is

router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;

        const newUser = new User({ firstname, lastname, username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'Server error during registration' });
    }
});

module.exports = router;
