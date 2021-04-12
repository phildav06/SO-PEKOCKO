const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    // id: { type: mongoose.Types.ObjectId, require: true },    // ObjectID — identifiant unique créé par MongoDB
    name: { type: String, require: true },                      // string — nom de la sauce
    userId: { type: String, require: true },                    // string — identifiant unique MongoDB pour l\'utilisateur qui a créé la sauce
    manufacturer: { type: String, require: true },              // string — fabricant de la sauce
    description: { type: String, require: true },               // string — description de la sauce
    mainPepper: { type: String, require: true },                // string — principal ingrédient dans la sauce
    imageUrl: { type: String, require: true },                  // string — string de l\'image de la sauce téléchargée par l\'utilisateur
    heat: { type: Number, require: true },                      // number — nombre entre 1 et 10 décrivant la sauce
    likes: { type: Number, require: true },                     // number — nombre d\'utilisateurs qui aiment la sauce
    dislikes: { type: Number, require: true },                  // number — nombre d\'utilisateurs qui n\'aiment pas la sauce
    usersLiked: { type: Object, require: true },                // [string] — tableau d\'identifiants d\'utilisateurs ayant aimé la sauce
    usersDisliked: { type: Object, require: true }              // [string] — tableau d\'identifiants d\'utilisateurs n\'ayant pas aimé la sauce
});

module.exports = mongoose.model('Sauce', sauceSchema);