// Express / Router
const express = require('express')
const router = express.Router()
// Middleware
router.use(express.json())

// Variables
const config = require('../config.json')
const entries = config.contents
const { Error, Send } = require('../util/ResponseHandler')

router.get(`/:content`, (req, res) => {

    const content = req.params.content.toLowerCase()

    if (entries.includes(content) == true) {

        const file = require(`../../db/${content}.json`)
        Send(res, 200, file)

    } else {
        Error(res, 404)
    }

})

router.get(`/album/:id`, (req, res) => {
   
    const targetAlbum = req.params.id

    const file = require(`../../db/album.json`)
    const result = file.ALBUM_LIST.find((album) => {
        return album.title == targetAlbum || album.id == targetAlbum 
    })
    
    if (result == undefined) {
        Error(res, 404)
    } else {
        Send(res, 202, result)
    }

})

router.get(`/band/:id`, (req, res) => {
   
    const targetAlbum = req.params.id
    const file = require(`../../db/album.json`)

    // Get Album from a ID or Album Name
    const albumByID = file.ALBUM_LIST.find((album) => {
        return album.title == targetAlbum || album.id == targetAlbum 
    })
    // Response Handler
    if (albumByID == undefined) {
        Error(res, 404)
    } else {
        Send(res, 202, albumByID)
    }

})

// Export
module.exports = router

