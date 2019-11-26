const express = require('express');
const apiRouter = require('./routers/apiRouter')

//---Set up app---
const app = express();

//---Set up apiRouter---
app.use('/api', apiRouter)

//---Error Handlers---


module.exports = app;