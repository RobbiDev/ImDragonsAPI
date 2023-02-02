// Express / Router
const express = require('express')
const router = express.Router()
// Middleware
router.use(express.json())

// Variables
const config = require('../config.json')
const entries = config.contents

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

    res.status(200).json(file)

})

router.get(`/:content`, (req, res) => {

    const content = req.params.content.toLowerCase()

    if (entries.includes(content) == true) {

        const file = require(`../../db/${content}.json`)

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(file)
    } else {
        res.status(404).send({ message: `No Such Data route could be found. Please Look back at available routes` })
    }

})

router.get(`/album/:id`, (req, res) => {

   
    const targetAlbum = req.params.id

    const file = require(`../../db/album.json`)
    const result = file.ALBUM_LIST.find((album) => {
        return album.title == targetAlbum || album.id == targetAlbum 
    })
    res.status(404).json(result)

    console.log(result)

})

// Export
module.exports = router

