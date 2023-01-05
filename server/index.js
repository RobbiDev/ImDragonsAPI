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

// GET/request Creator for Collections
app.get(`/${apiName}/:cat/:entry`, (req, res) => {

    const cat = req.params.cat.toLowerCase()
    const entry = req.params.entry.toLowerCase()
    
    if (apiEntries.category.includes(cat) == true && apiEntries.data.includes(entry) == true) {
        
        const file = require(`../api/data/${cat}/${entry}.json`)

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