// Server Constants
const express = require('express');
const app = express()
const PORT = process.env.PORT || 5000

// Data Access Constants
const band = require('./api/data/band.json')
const songlist = require('./api/data/songlist.json')
const dataEntries = ["band", "album", "songlist"]

// Use Express 
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send(
        JSON.stringify({
            message: 'Route Not Found: Please use the /imaginejs endpoint',
        })
    )
})

// Get Request
app.get('/imaginejs', (req, res) => {
    res.status(200).send("Welcome to the Imaginedragons.js API.")
})

app.get('/imaginejs/data', (req, res) => {
    res.status(200).send({ band, songlist })
})

app.get('/imaginejs/data/:jsonEntry', (req, res) => {

    const entry = req.params.jsonEntry
    const response = require(`./api/data/${entry}.json`)

    if (!entry) {
        res.status(418).send({ message: 'Needs a Data ID' })
    }

    if (dataEntries.indexOf(entry) > -1) {
        res.status(200).send(response)
    } else {
        res.status(404).send({ message: `No Such Data Entry could be found.` })
    }
})

app.listen(
    PORT,
    () => console.log(`Server running at https://api.unnecessarylibraries.com/`)
)