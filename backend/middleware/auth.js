// Importation du package jsonwebtoken pour créer et vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Récupération du token dans le header authorisation en récupérant le 2ème élément du tableau
        const token = req.headers.authorization.split(' ')[1];
        
        // Décodage du token avec jsonwebtoken verify
        const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
        const userId = decodedToken.userId;
        
        // Si il ya un userId dans le corp de la requête et qu'il est différent
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch {
        res.status(401).json({ error: new Error('Requête non authentifiée !') });
      }
    };