// Express / Router
const express = require('express')
const router = express.Router()
// Variables
const config = require('../../config.json')
const apiName = config.apiName
const apiEntries = config.entries

// Middleware
router.use(express.json())

// Custom Request Handler
router.get(`/`, function (req, res) {

    // Variables
    let msg = "Missing"
    const cat = req.body.category || msg
    const type = req.body['content-type'] || msg
    const entry = req.body.content || msg

    // Error Object
    class ResObj {
        constructor() {
            this.ERROR = "404: Missing Values are not specified"
            this.REQUEST = {
                'Category': cat,
                'Content-Type': type,
                'Targeted-Content': entry
            }
        }
    }

    // Initiate Error Object
    let obj = new ResObj

    // Check if values are specified
    if (apiEntries.category.includes(cat) && apiEntries.type.includes(type) && apiEntries.contents.includes(entry) == true) {
        // URL Constructor
        const file = require(`../../db/${cat}/${type}/${entry}.json`)
        // Send URL
        res.status(200).json(file)
    } else if (cat == msg || type == msg || entry == msg) {
        // Error
        obj.ERROR = "400: The given values don't exist or request doesnt contain a body"
        res.status(400).send(obj)
    } else {
        // Error
        obj.ERROR = "404: Values are not specified or spelt wrong"
        res.status(404).send(obj)
    }
})

// Export
module.exports = router

