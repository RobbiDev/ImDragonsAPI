// File Builder
module.exports = function file(x, y, z) {

    // Turn Parameters into a array
    let arr = [x, y, z]

    // If all Parameters are defined
    if (arr.every(v => typeof v === 'string')) {
        let file = require(`./api/${x}/${y}/${z}.js`)
        return file
    }

    // If all Parameters are undefined
    if (arr.every(v => typeof v == 'undefined')) return TypeError("ERROR")

    // If last Parameter and 2nd Parameter is undefined 
    if (typeof y == 'undefined') {
        let file = require(`./api/${x}.js`)
        return file
    }

    // If last Parameter is now undefined 
    if (typeof z == "undefined" && typeof z == "undefined") {
        let file = require(`./api/${x}/${y}.js`)
        return file
    }
}