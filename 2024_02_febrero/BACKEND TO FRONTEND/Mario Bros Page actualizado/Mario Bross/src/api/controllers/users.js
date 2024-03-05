const { generateSign } = require("../../config/jwt");
const User = require("../models/users");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    newUser.rol = "user";

    const userDuplicated = await User.findOne({ email: req.body.email });

    if (userDuplicated) {
      return res.status(400).json("Ese usuario ya existe");
    }

    await newUser.save();

    return res.status(201).json("Usuario creado correctamente");
  } catch (error) {
    return res.status(400).json("Error");
  }
};

const login = async (req, res, next) => {
  try {
    const { password, email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("El usuario no existe");
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({
        token,
        user,
      });
    }

    return res.status(400).json("La contraseña es errónea");
  } catch (error) {
    return res.status(400).json("Error");
  }
};

module.exports = {
  register,
  login,
};
