
const notesArray = [
    {
        title: "Note 1",
        body: "This note contains a description"
    }
];

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        res.json(notesArray)
    });

    

};