// Création d'un routeur express
const express = require('express');
const router = express.Router();

// *********** CONTROLE DES SAUCES ***********
// Importation du fichier "sauce" du dossier "controllers"
const sauceCtrl = require('../controllers/sauce'); 

// Importation du fichier "auth" du dossier "middleware" pour l'authentification
const auth = require('../middleware/auth');

// Importation du fichier "multer-config" du dossier "middleware" pour le téléchargement
const multer = require('../middleware/multer-config');


// Création d'une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);

// Modification d'une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// Suppression d'une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// Récupération d'une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);

// Récupération de toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);

// Like Dislike d'une sauce
router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce);

module.exports = router;
