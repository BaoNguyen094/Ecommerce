const express = require('express');
const app = express();
const port = 3000;
const db = require('./config/db');

app.use('/', (req, res) => {
    res.send('chào bạn ');
});
db();
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});