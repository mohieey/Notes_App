const fs = require("fs");
const chalk = require("chalk");
const { inverse } = require("chalk");

const addNotes = function (title, body) {
  const notes = loadNotes();
  const existingNote = notes.find((note) => note.title === title);
  if (!existingNote) {
    notes.push({ title: title, body: body });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note has been added"));
  } else {
    console.log(chalk.red.inverse("Taken Title!"));
  }
};
const removeNote = function (title) {
  const notes = loadNotes();
  const noteToRemove = notes.find((note) => note.title === title);
  if (noteToRemove) {
    const index = notes.indexOf(noteToRemove);
    notes.splice(index, 1);
    saveNotes(notes);
    console.log(chalk.green.inverse("Note Removed!"));
  } else {
    console.log(chalk.red.inverse("Note Not Found"));
  }
};
const listNotes = () => {
  console.log(chalk.bgGray.yellowBright("Your Notes"));
  const notes = loadNotes();
  notes.forEach((note) => console.log(chalk.cyan(note.title)));
};
const readNote = (title) => {
  const note = loadNotes().find((note) => note.title === title);
  if (note) {
    console.log(chalk.bgBlue.white(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red("Not Found!"));
  }
};
const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("./notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};
const saveNotes = function (notes) {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("./notes.json", dataJson);
};

module.exports = { addNotes, removeNote, listNotes, readNote };
