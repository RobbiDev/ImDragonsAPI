// Express / Router
const express = require('express')
const router = express.Router()
// Middleware
router.use(express.json())

// Variables
const config = require('../../config.json')
const apiEntries = config.entries

// Request Handler
router.get('/', (req, res) => {

        const file = {
            "Collection-Types": [
                "lists", "infomation"
            ],
            "Examples": {
                "Album list": "/imdragons/v1/collection/list/album",
                "Song list": "/imdragons/v1/collection/list/song"
            }
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(file)

})

router.get(`/:contentType`, (req, res) => {

    const cat = req.params.contentType.toLowerCase()

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
router.get(`/:contentType/:content`, (req, res) => {

    const type = req.params.contentType.toLowerCase()
    const entry = req.params.content.toLowerCase()

    if (apiEntries.type.includes(type) == true && apiEntries.contents.includes(entry) == true) {

        const file = require(`../../../db/collection/${type}/${entry}.json`)

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(file)
    } else {
        res.status(404).send({ message: `No Such Data route could be found. Please Look back at available routes` })
    }

})

// Export
module.exports = router

