const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
const uuidv4 = require('uuid');


const app = express();

const PORT = process.env.PORT || 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//HTML ROUTES
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


//API ROUTES

//Get Request
app.get("/api/notes", function(req, res) {
    res.send(db);
});


//Post Request
app.post("/api/notes", function(req, res) {

    let noteId = uuidv4();
    let newNote = {
      id: noteId,
      title: req.body.title,
      text: req.body.text
    };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;

      const allNotes = JSON.parse(data);

      allNotes.push(newNote);

      fs.writeFile("./db/db.json", JSON.stringify(allNotes, null, 2), err => {
        if (err) throw err;
        res.send(db);
        console.log("Note created!")
      });
    });
});

//delete request
app.delete("/api/notes/:id", (req, res) => {

    let noteId = req.params.id;

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;

      const allNotes = JSON.parse(data);
      const newAllNotes = allNotes.filter(note => note.id != noteId);

      fs.writeFile("./db/db.json", JSON.stringify(newAllNotes, null, 2), err => {
        if (err) throw err;
        res.send(db);
        console.log("Note deleted!")
      });
    });
});






//Port Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});