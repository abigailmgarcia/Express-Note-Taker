const fs = require('fs');
const util = require('util');
//promise version of fs.read
const readFromFile = util.promisify(fs.readFile);

//write data to JSON and give content
// @param {string} destination 
// @param {object} content
// @returns {void}

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null,4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
        );

    //function read data from file and append
        // @param {string} file
        // @param {object} content
        // @returns {void}

    const readAndAppend = (content, file) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(content);
                writeToFile(file, parsedData);
            }
        });
    };

    module.exports = { readFromFile, writeToFile, readAndAppend};