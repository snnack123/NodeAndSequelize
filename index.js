const app = require('./server.js');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./utils/middlewares.js');
const db = require('./app/models/index.js');

const Product = db.Product;

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("I will be shown on the Browser");
    // console.log('Request Type:', req.method)
    // console.log("I will be shown on the Terminal");
});

app.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).send('Username and Password required');
            return;
        }

        if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
            throw new Error('Missing JWT_SECRET or JWT_EXPIRES_IN in environment variables');
        }

        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
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

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));