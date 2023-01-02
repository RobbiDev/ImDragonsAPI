// Server Constants
const fs = require('fs');
const express = require('express');
const app = express()
const PORT = process.env.PORT || 5000
const apiName = "ImDragons"

// Data Access Constants
const band = require('./api/data/band.json')
const songs = require('./api/data/songs.json')
const dataEntries = ["band", "album", "songs"]
const home = fs.readFileSync('./api/home.html')

// JSON Middleware
app.use(express.json())

// Root Directory of api.unnecessarylibraries.com
app.get('/', (req, res) => {
    res.status(200).send(
        JSON.stringify({
            message: 'Route Not Found: Please use the /ImDragons endpoint',
        })
    )
})

// Get Request for api.unnecessarylibraries.com
app.get(`/${apiName}`, (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(home);

})

// Get Request for https://api.unnecessarylibraries.com/imaginejs/data
app.get(`/${apiName}/data`, (req, res) => {
    res.status(200).send({ band, songs })
})

app.get(`/${apiName}/data/:jsonEntry`, (req, res) => {


    const param = req.params.jsonEntry
    const entry = param.toLowerCase()

    if (dataEntries.includes(entry) == true) {
        const response = require(`./api/data/${entry}.json`)

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response)
    } else {
        res.status(404).send({ message: `No Such Data route could be found. Please Look back at available routes` })
    }


})

app.listen(
    PORT,
    () => console.log(`Server running at https://api.unnecessarylibraries.com/`)
)