const mongoose = require('mongoose');

// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Crear el modelo
const User = mongoose.model('User', userSchema);

// Exportar el modelo
module.exports = User;
