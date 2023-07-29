const notes = require('express').Router();
const {
    readFromFile,
    readAndAppend,
    writeToFile
} = require('../utils/fsutils');
const { v4: uuidv4 } = require('uuid');

//retrieves JSON
notes.get('/', (req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        id: uuidv4()
    };

    readAndAppend(newNote, './db/db.json');
    res.json('success: new note added');
});

notes.get('/:id', (req, res) =>{
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const response = json.find((note) => note.id === noteId);
            res.send(response);
            console.log('successfully retrieved note', response)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('error retrieving note');
        });
})

// delete route
notes.delete('/:id', (req,res) => {
    const noteId = req.params.id;

    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const response = json.filter((note) => note.id !== noteId);
            writeToFile('./db/db.json', response);
            res.send()
            console.log('succesfully removed note', response)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('error retrieving note');
        });
})


module.exports = notes