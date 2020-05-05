const db = require('./../db/db.json');
const fs = require('fs');
const { uuid } = require('uuidv4');



module.exports = (app) => {
    //Get Request
    app.get("/api/notes", function(req, res) {
    res.send(db);
    });


    //Post Request
    app.post("/api/notes", function(req, res) {

        let noteId = uuid();
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
                res.send(allNotes);
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
            res.send(newAllNotes);
            console.log("Note deleted!")
        });
        });
    });
};