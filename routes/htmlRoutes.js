const router = require("express").Router();
const path = require("path");

// This is the route that will send the user to the index.html file.
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// This is the route that will send the user to the notes.html file.
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;
