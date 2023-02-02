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

router.get(`/album/:album`, (req, res) => {
   
    const targetedAlbum = req.params.album

    const file = require(`../../db/album.json`)
    const result = file.ALBUM_LIST.find((album) => {
        return album.title == targetedAlbum || album.id == targetedAlbum 
    })
    
    if (result == undefined) return Error(res, 404)

    Send(res, 202, result)

})

router.get(`/band/:content`, (req, res) => {
   
    const targetedContent = req.params.content
    let ContentType = require(`../../db/band.json`).BAND_INFO
    let subContent = Object.keys(ContentType)
    // Error Handling
    if (subContent.indexOf(targetedContent) == -1) return Error(res, 404)
    // Response Handler
    let subContentProps = Object.getOwnPropertyDescriptor(ContentType, targetedContent).value
    Send(res, 202, subContentProps)

})

// Export
module.exports = router

