require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const charactersRouter = require("./src/api/routes/characters");
const cors = require("cors");
const usersRouter = require("./src/api/routes/users");

const app = express();

connectDB();

app.use(cors())

app.use(express.json());

app.use("/characters", charactersRouter);
app.use("/users", usersRouter);

app.use("*", (req, res, next) => {
    return res.status(404).json("Route not found")
})

app.listen(3000, () => {
    console.log("El servidor está iniciado en: http://localhost:3000");
})