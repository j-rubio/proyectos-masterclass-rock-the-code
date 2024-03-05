const Character = require("../models/characters");

const getCharacters = async (req, res, next) => {
  try {
    const characters = await Character.find();
    return res.status(200).json(characters);
  } catch (error) {
    return res.status(400).json("Error al conseguir los personajes");
  }
};

const postCharacter = async (req, res, next) => {
  try {
    console.log(req.body);
    const newCharacter = new Character(req.body);
    const character = await newCharacter.save();
    return res.status(201).json(character)
  } catch (error) {
    return res.status(400).json("Error al crear el personaje");
  }
};

const deleteCharacter = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedCharacter = await Character.findByIdAndDelete(id);
        return res.status(200).json(deletedCharacter)
    } catch (error) {
        return res.status(400).json("Error al eliminar el personaje");
    }
}

module.exports = {
  getCharacters,
  postCharacter,
  deleteCharacter
};
