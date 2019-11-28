const express = require('express');
const apiRouter = require('./routers/apiRouter')
const { handle404s, handle400s, handle405s, handle422s } = require('./errors/index')

//---Set up app---
const app = express();

app.use(express.json())

//---Set up apiRouter---
app.use('/api', apiRouter)

//---Error Handlers---
app.use(handle404s, handle400s, handle405s, handle422s)


module.exports = app;