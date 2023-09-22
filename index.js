const app = require('./server.js');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./utils/middlewares.js');
const db = require('./app/models/index.js');
const bcrypt = require('bcrypt');

const Product = db.Product;

const PORT = process.env.PORT || 3000;
const saltRounds = process.env.BCRYPT_SALT ? Number(process.env.BCRYPT_SALT) : 10;

app.get("/", (req, res) => {
    res.send("I will be shown on the Browser");
});

app.post('/login', async (req, res) => {
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

app.get('/users/:userId', verifyToken, (req, res) => {
    const { userId } = req.params;

    res.status(200).json({ id: userId });
})

app.post('/products', verifyToken, async (req, res) => {
    await Product.create({ sku: '123', name: 'name', price: 123});

    res.sendStatus(200);
});

app.post('/users', async (req, res) => {
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


app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));