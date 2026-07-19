const express = require('express');
const app = express();
require('dotenv').config();
const port = 3000;
const db = require('./config/db');

const authRouter = require('./routers/auth.router');
const userRouter = require('./routers/user.router');
const productRouter = require('./routers/product.router');
const uploadRouter = require('./routers/upload.router');

db();
app.use(express.json());
app.use('/uploads', express.static('uploads'))


app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/uploads', uploadRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});