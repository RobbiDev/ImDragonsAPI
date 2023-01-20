// Express / Router
const express = require('express')
const router = express.Router()
const obj = { 
    "test": "hi"
}

// Middleware
router.use(express.json())

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

// Export
module.exports = router

