const db = require('../app/models/index.js');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const saltRounds = process.env.BCRYPT_SALT ? Number(process.env.BCRYPT_SALT) : 10;

router.post('/login', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const user = await db.User.findOne({
            where: { email: req.body.email }, 
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        delete user.dataValues.password;

        const token = jwt.sign({ username: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(200).json({ message: 'Login successful', user: user, token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/users', async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }	

        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = await db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;