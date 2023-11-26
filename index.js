// const express = require('express')   // common JS
import express from 'express'; // ES6
import { tempRouter } from './src/routes/temp.route.js';

const app = express();
const port = 3000;

// router setting
app.use('/temp', tempRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
