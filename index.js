const app = require('express')()
const PORT = 8080

app.get('/bob', (req,res) => {
    res.status(200).send({
        "name": "Bob Ducan",
        "age": 23
    })
})

app.listen(
    PORT,
    () => console.log(`Im alive on https://localhost${PORT}`)
)