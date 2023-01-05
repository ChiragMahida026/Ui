const Notes = require("../models/noteModel");

const noteCtrl = {
  getNotes: async (req, res) => {
    // get all notes for a particular user (to pull this off, I added a property called user_id in note schema).
    try {
      const notes = await Notes.find({ user_id: req.user.id }); // req.user is set in auth middleware, if you're confused check that middleware.
      res.json(notes);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createNote: async (req, res) => {
    try {
      const { title, content,codes } = req.body;
      const newNote = new Notes({
        title,
        content,
        codes,
        user_id: req.user.id, // so when you create a note, the "owner" of the note is saved too, so when you getNotes(), you can get all notes for a particular user out of thousands of notes in database.
        name: req.user.name,
      });
      await newNote.save();
      res.json({ msg: "Created a Note" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteNote: async (req, res) => {
    try {
      await Notes.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Note" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateNote: async (req, res) => {
    try {
      const { title, content,codes } = req.body;
      await Notes.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          content,
          codes,
          
        }
      );
      res.json({ msg: "Updated a Note" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getNote: async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);
      res.json(note);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = noteCtrl;
