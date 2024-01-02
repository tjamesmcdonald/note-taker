const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/api/notes', (req, res) => 
    res.json(notes)
);

app.post('/api/notes', (req, res) => {
const { title, text } = req.body;
const newNote = {
    title,
    text,
} 
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(parsedNotes))
    })
    res.json('success')
});

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);




app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
