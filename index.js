const express = require('express');
const app = express()
const PORT = 8080;

app.use( express.json() )

app.listen(
    PORT,
    () => console.log(`Im alive on https://localhost${PORT}`)
)

app.get('/tshirt', (req,res) => {
    res.status(200).send({
        "tshirt": "Bob Ducan",
        "size": 'Large'
    })
})

app.post('/tshirt/:id', (req, res) => {

    const { id } = req.params
    const { logo } = req.body

    if (!id) {
        res.status(418).send({ message: 'Need a ID'})
    }

    if (!logo) {
        res.status(418).send({ message: 'We need a logo!'})
    }

    res.send({
        tshirt: `With your ${logo} of a ID of ${id}`
    })
})

