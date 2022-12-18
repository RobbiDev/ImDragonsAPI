// Server Constants
const express = require('express');
const app = express()
const PORT = process.env.PORT || 5000

// Data Access Constants
const band = require('./data/band.json')
const songlist = require('./data/songlist.json')
const dataEntries = ["band", "album", "songlist"]

// Use Express 
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send(
        JSON.stringify({
            message: 'Route Not Found: Please use the api/imaginejs endpoint',
        })
    )
})

// Get Request
app.get('/api/imaginejs', (req, res) => {
    res.status(200).send("Welcome to the Imaginedragons.js API")
})

app.get('/api/imaginejs/data', (req, res) => {
    res.status(200).send({ band, songlist })
})

app.get('/api/imaginejs/data/:jsonEntry', (req, res) => {

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

app.listen(
    PORT,
    () => console.log(`Server Started on ${PORT}`)
)