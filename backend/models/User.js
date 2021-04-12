const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma pour se connecter
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Permet d'avoir un unique utilisateur pour un même email
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);