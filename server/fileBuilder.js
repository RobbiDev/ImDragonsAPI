// File Builder
module.exports = function file(x) {

    // If all Parameters are undefined
    // if ( x == 'undefined') return TypeError("ERROR")

    // If last Parameter and 2nd Parameter is undefined 
    if (x == 'main') {
        let file = require(`./api/public/${x}.js`)
        return file
    }
}