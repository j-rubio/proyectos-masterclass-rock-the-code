const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  img: { type: String, required: true, trim: true },
});

const Character = mongoose.model("characters", characterSchema, "characters");
module.exports = Character;