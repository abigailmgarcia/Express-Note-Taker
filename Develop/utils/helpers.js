const fs = require('fs');
const util = require('util');
//promise version of fs.read
const readFromFile = util.promisify(fs.readFile);

//write data to JSON and give content
@param {string}
@param {object}
@returns {void}

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null,4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
        );

        