const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const readFromFile = fs.promises.readFile;
const writeToFile = fs.promises.writeFile;

// This is the route that will read the db.json file and will return all the saved notes as JSON.
router.get("/notes", async (req, res) => {
  try {
    const notes = await readFromFile("./db/db.json");
    const parseTheNotes = JSON.parse(notes);
    res.json(parseTheNotes);
  } catch (err) {
    console.log(err);
  }
});

// This is the route that will add a new note to the db.json file.
router.post("/notes", async (req, res) => {
  try {
    const notes = await readFromFile("./db/db.json");
    const parseTheNotes = JSON.parse(notes);
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    parseTheNotes.push(newNote);
    const updatedNotes = await writeToFile(
      "./db/db.json",
      JSON.stringify(parseTheNotes)
    );
    res.json(updatedNotes);
  } catch (err) {
    console.log(err);
  }
});

// This is the route that will delete a note based on the id of that note.
router.delete("/notes/:id", async (req, res) => {
  try {
    const notes = await readFromFile("./db/db.json");
    const parseTheNotes = JSON.parse(notes);
    const updatedNotes = parseTheNotes.filter(
      (note) => note.id !== req.params.id
    );
    await writeToFile("./db/db.json", JSON.stringify(updatedNotes));
    res.json(updatedNotes);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
