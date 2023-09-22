const app = require('./server.js');
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('I will be shown on the Browser');
});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
