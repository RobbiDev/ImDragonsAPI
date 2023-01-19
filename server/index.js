// Use Express
const express = require('express');
const app = express()

app.use(express.json())

const test = require("./api/template.js");

// // Imports
const config = require('./config.json')
const apiName = config.apiName
const apiEntries = config.entries
const process = require('process')

// Remove Headers
app.use(function (req, res, next) {
    res.removeHeader("x-powered-by")
    res.removeHeader("set-cookie")
    res.removeHeader("Date")
    res.removeHeader("Connection")
    next()
})

// test route
app.use("/test", test);

// Custom Request Handler
app.post(`/${apiName}/v1/custom/`, function (req, res) {
    
    // Variables
    let msg = "Missing"
    const cat = req.body.category || msg
    const type = req.body.contentType || msg
    const entry = req.body.content || msg

    // Error Object
    class ResObj {
        constructor() {
            this.ERROR = "404: Missing Values are not specified"
            this.SENT = {
                'Category': cat,
                'Content-Type': type,
                'Target Content': entry
            }
        }
    }

    // Initiate Error Object
    let obj = new ResObj

    // Check if values are specified
    if (apiEntries.category.includes(cat) && apiEntries.type.includes(type) && apiEntries.contents.includes(entry) == true) {
        // URL Constructor
        const file = require(`../api/data/${cat}/${type}/${entry}.json`)
        // Send URL
        res.status(200).json(file)
    } else if (cat == msg || type == msg || entry == msg) {
        // Error
        obj.ERROR = "404: Missing Values are not specified"
        res.status(404).send(obj)
    } else {
        // Error
        obj.ERROR = "404: Specified values don't exist or spelt wrong"
        res.status(404).send(obj)
    }
})

// GET Collections Types
// Ex: /imdragons/v1/collection
app.get(`/${apiName}/v1/:category/`, (req, res) => {

    const cat = req.params.category.toLowerCase()

    if (apiEntries.category.includes(cat) == true) {

        const file = {
            "content-types": [
                "lists", "individuals"
            ],
            "Examples": {
                "Album list": "/imdragons/v1/collection/list/album",
                "Song list": "/imdragons/v1/collection/list/song"
            }
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(file)
    } else {
        res.status(404).send({ message: `No Such Data route could be found. Please Look back at available routes` })
    }

})

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