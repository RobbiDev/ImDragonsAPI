// Use Express
const express = require('express');
const app = express()
// JSON Middleware
app.use(express.json())

// Imports
const config = require('./config.json')
const builder = require('./fileBuilder.js')
// Global
const apiName = config.apiName

// Remove Headers
app.use(function (req, res, next) {
    res.removeHeader("x-powered-by")
    res.removeHeader("set-cookie")
    res.removeHeader("Date")
    res.removeHeader("Connection")
    next()
})

// Maintenance Mode
if (config.maintenance === true) {
    app.get(`*`, (req, res) => {
        res.status(503).send({ maintenance: `Server currently down for maintenance` })
    })
}

// Custom Request Handler
app.use(`/${apiName}/v1/custom`, builder("custom", "custom"));

// GET Collections Types
app.use(`/${apiName}/v1/collection/`, builder("collection", "main"))

// App Listen
app.listen(config.PORT, () => {
    // If in Staging Mode
    if (config.env.stage == true) {
        console.log(`Server is in Staging Mode and is running on http://localhost:${config.PORT}`)
    } else {
        console.warn(`WARNING: Server is in PRODUCTION Mode! All changes will be live immediately`)
        console.log(`Server is in PRODUCTION Mode and is running on https://api.unnecessarylibraries.com/imdragons/`)
    }
})