const express = require('express');
const cors = require('cors')
const apiRouter = require('./routers/apiRouter')
const { handle404s, handle400s, handle405s, handle422s, handle500s, customHandlers } = require('./errors/index')

//---Set up app---
const app = express();
app.use(express.json())

//---Set up cross origin resource sharing---
app.use(cors())

//---Set up apiRouter---
app.use('/api', apiRouter)

//---Error Handler(404)---
app.all('/*', handle404s)


//---Error Handlers---
app.use(customHandlers)
app.use(handle400s)
app.use(handle405s)
app.use(handle422s)
app.use(handle500s)


module.exports = app;