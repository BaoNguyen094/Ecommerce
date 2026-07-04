const express = require('express');
const app = express();
const port = 3000;
const db = require('./config/db');
require('dotenv').config();

const authRouter = require('./routers/auth.router');
require('dotenv').config();

db();
app.use(express.json());

app.use('/api/auth', authRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});