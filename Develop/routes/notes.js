const notes = require('express').Router();
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../utils/helpers');

//retrieves JSON
notes.get('/', (req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

