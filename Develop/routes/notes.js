const notes = require('express').Router();
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../utils/helpers');

//retrieves JSON
notes.get('/', (req,res) => {
    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        note_id: uuid()
    };

    readAndAppend(newNote, './db/db.json');
    res.json('success: new note added');
});


module.exports = notes