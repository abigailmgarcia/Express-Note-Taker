// initalize express and create port
const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./routes/notes')
// const apiRoutes = require ('./apiRoutes');

const PORT = process.env.PORT || 3000;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use('/api', api);
app.use(express.static('public'));
app.use('/api/notes', notes);

// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );
app.use('/api', notes);

//GET route for to notes page from main page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// Wildcard route to direct users back to the landing page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


// Start the server and listen for incoming requests
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

module.exports = app;