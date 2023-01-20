// Template File for Custom Routes
const express = require('express')
const router = express.Router()
// Variables
const config = require('../../config.json')
const apiName = config.apiName
const apiEntries = config.entries

// Middleware
router.use(express.json())

// Custom Request Handler
router.post(`/`, function (req, res) {
    
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

// Export
module.exports = router

