const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// Création de nouveaux utilisateurs dans la base de données
exports.signup = (req, res, next) => {
    // Chiffrage du mot de passe pour chaque utilisateur
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // enregistrement de l'utilisateur dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Vérification des infos d'identification d'un utilisateur
exports.login = (req, res, next) => {
    // recherche de l'utilisateur
    User.findOne({ email: req.body.email })
        .then(user => {
            // Si l'utilisateur n'a pas été trouvé, envoi du message d'erreur 401
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            // Comparaison du mot de passe avec le hash correspondant
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // Si le mot de passe ne correspond pas, envoi du message d'erreur 401 
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    // Si le mot de passe correspond, envoi de l'utilisateur avec son mot de passe sous forme de TOKEN
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};