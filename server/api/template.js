// Template File for Custom Routes
const express = require('express')
const router = express.Router()
const obj = { 
    "test": "hi"
}

// Middleware
router.use(express.json())

// Request Handler
router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(404).send(obj)
})

// Export
module.exports = router

