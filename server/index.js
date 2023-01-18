// Use Express
const express = require('express');
const app = express()

// JSON Middleware
app.use(express.json())

// Add Configurations
const config = require('../api/config.json')
const apiName = config.apiName

// Import API Entries
const apiEntries = config.entries

// JSON Middleware
app.use(express.json())

app.post(`/${apiName}/v1/test/`, function (req, res) {

    let msg = "Missing"
    const cat = req.body.category ? req.body.category : msg
    const type = req.body.contentType ? req.body.contentType : msg
    const entry = req.body.content ? req.body.content : msg

    if (apiEntries.category.includes(cat) == true) {

        // Construcut URL
        const file = require(`../api/data/${cat}/${type}/${entry}.json`)

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(file)

    } else {

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

        res.setHeader('Content-Type', 'application/json');
        res.status(404).send(new ResObj)
    }

});

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

// GET/request Creator for Collections
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





// GET/request Creator for Individuals


app.listen(
    config.PORT,
    () => console.log(`Server running at https://api.unnecessarylibraries.com/`)
)