const express = require('express');
const app = express();
require('dotenv').config();
const port = 3000;
const db = require('./config/db');

const authRouter = require('./routers/auth.router');
const userRouter = require('./routers/user.router');



db();
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});