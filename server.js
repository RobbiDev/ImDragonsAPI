// Server Constants
const express = require('express');
const app = express()
const PORT = 8080

// Data Access Constants
const band = require('./data/band.json')
const songlist = require('./data/songlist.json')
const dataEntries = ["band", "album", "songlist"]

// Use Express 
app.use(express.json())

app.listen(
    PORT,
    () => console.log(`Im alive on http://localhost:${PORT}`)
)

// Get Request
app.get('/api/imaginedragonsjs', (req, res) => {
    res.status(200).send("Welcome to the Imaginedragons.js API")
})

app.get('/api/imaginedragonsjs/data', (req, res) => {
    res.status(200).send({ band, songlist })
})

app.get('/api/imaginedragonsjs/data/:jsonEntry', (req, res) => {

    const entry = req.params.jsonEntry
    const response = require(`./data/${entry}.json`)

    if (!entry) {
        res.status(418).send({ message: 'Needs a Data ID' })
    }

    if (dataEntries.indexOf(entry) > -1) {
        res.status(200).send(response)
    } else {
        res.status(404).send({ message: `No Such Data Entry could be found.` })
    }
})
