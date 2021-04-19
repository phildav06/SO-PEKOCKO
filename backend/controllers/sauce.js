// *********** CONTROLE DES SAUCES ***********
// Importation du fichier "Sauce" dans le dossier "models"
const Sauce = require('../models/Sauce');
const fs = require('fs');

// Création d'une nouvelle sauce transformée en objet js
exports.createSauce = (req, res, next) => {
  console.log('createSauce');
  const sauceObject = JSON.parse(req.body.sauce);

  // Suppression de l'id envoyé par le frontend
  delete sauceObject._id;
  // Création du modèle de sauce
  const sauce = new Sauce({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  // Sauvegade du modèle de sauce dans la base de données
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch(error => res.status(400).json({ error }));
};

// Modification d'une sauce
exports.modifySauce = (req, res, next) => {
  console.log('modifySauce');
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.findById(req.params.id)
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  console.log('deleteSauce');
  Sauce.findById(req.params.id)
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Récupération d'une sauce
exports.getOneSauce = (req, res, next) => {
  console.log('getOneSauce');
  Sauce.findById(req.params.id)
    .then(sauce => {
      console.log(sauce);
      return res.status(200).json(sauce)
    })
    .catch(error => res.status(404).json({ error }));
};

// Récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => {
  console.log('getAllSauces');
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

// Like ou Dislike d'une sauce (3 possibilités soit like/dislike: case 0, soit like: case 1, soit dislike: case -1)
exports.likeDislikeSauce = (req, res, next) => {
  console.log('likeDislikeSauce');
  switch (req.body.like) {
    case 0:                                                                       // Si j'aime = 0, l'utilisateur annule ce qu'il aime ou n'aime pas
      Sauce.findById(req.params.id)
        .then((sauce) => {
          if (sauce.usersLiked.find(user => user === req.body.userId)) {          // Recherche si un utilisateur se trouve dans la base de données
            Sauce.updateOne({ _id: req.params.id }, {                             // Si présent mise à jour de la sauce avec son id
              $inc: { likes: -1 },                                                // L'utilisateur annule ce qu'il aime
              $pull: { usersLiked: req.body.userId }                              // Envoi du retrait de la valeur ayant été ajoutée
            })
              .then(() => res.status(201).json({ message: 'Valeur du like actualisée !' }))
              .catch(error => res.status(400).json({ error }));
          }

          else if (sauce.usersDisliked.find(user => user === req.body.userId)) {  // Recherche si un utilisateur se trouve dans la base de données
            Sauce.updateOne({ _id: req.params.id }, {                             // Si présent mise à jour de la sauce avec son id
              $inc: { dislikes: -1 },                                             // L'utilisateur annule ce qu'il n'aime pas
              $pull: { usersDisliked: req.body.userId }                           // Envoi du retrait de la valeur ayant été ajoutée
            })
              .then(() => res.status(201).json({ message: 'Valeur du dislike actualisée !' }))
              .catch(error => res.status(400).json({ error }));
          }
        })
        .catch(error => res.status(404).json({ error }));
      break;

    case 1:                                                                       // Si j'aime = 1, l'utilisateur ajout qu'il aime
      Sauce.updateOne({ _id: req.params.id }, {                                   // Mise à jour de la sauce avec son id
        $inc: { likes: 1 },                                                       // L'utilisateur ajoute un "j'aime"
        $push: { usersLiked: req.body.userId }                                    // Envoi de la valeur ayant été ajoutée
      })
        .then(() => res.status(200).json({ message: 'Ajout d\'un like validé !' }))
        .catch(error => res.status(400).json({ error }));
      break;

    case -1:                                                                      // Si j'aime = -1, l'utilisateur ajoute qu'il n'aime pas
      Sauce.updateOne({ _id: req.params.id }, {                                   // Mise à jour de la sauce avec son id
        $inc: { dislikes: 1 },                                                    // L'utilisateur ajoute un "je n'aime pas"
        $push: { usersDisliked: req.body.userId }                                 // Envoi de la valeur ayant été ajoutée
      })
        .then(() => res.status(200).json({ message: 'Ajout d\'un dislike validé !' }))
        .catch(error => res.status(400).json({ error }));
      break;
    default:
      console.error('Erreur de la requête !')
  }
};
