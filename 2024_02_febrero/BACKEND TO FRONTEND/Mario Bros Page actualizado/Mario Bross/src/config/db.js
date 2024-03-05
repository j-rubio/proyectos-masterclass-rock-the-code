const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Conectados con éxito a la BBDD");
    } catch (error) {
        console.log("Fallo al conectarse a la BBDD");
    }
}

module.exports = { connectDB }