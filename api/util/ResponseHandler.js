// Helper Functions
function Error(res, code) {
    return res.status(code).send({ message: `No Such Data route could be found. Please Look back at available routes` })
}

function Send(res, code, obj) {
    res.status(code).json(obj)
}
