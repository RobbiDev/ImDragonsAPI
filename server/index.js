// Use Express
const express = require('express');
const app = express()
// JSON Middleware
app.use(express.json())



const custom = require("./api/custom/custom.js");

// Imports
const config = require('./config.json')
const file = require('./fileBuilder.js')
const apiName = config.apiName
const apiEntries = config.entries

// Remove Headers
app.use(function (req, res, next) {
    res.removeHeader("x-powered-by")
    res.removeHeader("set-cookie")
    res.removeHeader("Date")
    res.removeHeader("Connection")
    next()
})

// Custom Request Handler
app.use(`/${apiName}/v1/custom`, file("custom", "custom"));

// GET Collections Types
app.use(`/${apiName}/v1/collection/`, file("collection", "main"))

// GET Content-Types within Collections
// Ex: /imdragons/v1/collection
app.get(`/${apiName}/v1/:category/:contentType`, (req, res) => {

    const cat = req.params.category.toLowerCase()
    const type = req.params.contentType.toLowerCase()

    if (apiEntries.category.includes(cat) == true) {

        const file = {
            "Content In List Collection": [
                "album", "songs", "awards"
            ],
            "Examples": {
                "Album list": "/imdragons/v1/collection/list/album",
                "Song list": "/imdragons/v1/collection/list/song",
                "Awards list": "/imdragons/v1/collection/list/awards"
            }
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(file)
    } else {
        res.status(404).send({ message: `No Such Data route could be found. Please Look back at available routes` })
    }

})

// GET Contents within a Collection Type
// Ex: /imdragons/v1/collections/lists/album
app.get(`/${apiName}/v1/:category/:contentType/:content`, (req, res) => {

    const cat = req.params.category.toLowerCase()
    const type = req.params.contentType.toLowerCase()
    const entry = req.params.content.toLowerCase()

    if (apiEntries.category.includes(cat) == true && apiEntries.data.includes(entry) == true) {

        const file = require(`../api/data/${cat}/${type}/${entry}.json`)

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(file)
    } else {
        res.status(404).send({ message: `No Such Data route could be found. Please Look back at available routes` })
    }

})

// App Listen
app.listen(
    config.PORT,
    () => console.log(`Server running at https://api.unnecessarylibraries.com/`)
)