const express = require('express');
const app = express();
const port = 3000;
const db = require('./config/db');
const authRouter = require('./routers/auth.router');
db();


app.use('/api/auth', authRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});