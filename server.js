const express = require('express');
const fs = require('fs');
const path = require('path');


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

//Get request
app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', function(err, savedNotes) {
        var words = JSON.parse(savedNotes);
        res.send(words);
    });
});

//Post request
app.post('/api/notes', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;

        let json = JSON.parse(data);
        let note = {
            title: req.body.title,
            text: req.body.text,
            id: uuivd1()
        }
        json.push(note);

        fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
            if (err) throw err;
            res.send('200');
        })

    })

})




//Port Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});