const { isAdmin, isAuth } = require("../../middlewares/Auth");
const { getCharacters, postCharacter, deleteCharacter } = require("../controllers/characters");

const charactersRouter = require("express").Router();

charactersRouter.get("/", getCharacters);
charactersRouter.post("/", [isAuth], postCharacter);
charactersRouter.delete("/:id", [isAdmin], deleteCharacter);

module.exports = charactersRouter;