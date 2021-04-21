// Importation d'Express
const express = require('express');

// Importation dotenv pour sécuriser mot de passe et login mongoDB
require('dotenv').config();

// Importatiion helmet pour aider à sécuriser les applications Express en définissant divers en-têtes HTTP
const helmet = require('helmet');

// const bodyParser = require('body-parser');

// Importation mongoDB pour récupération de la base de données
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

// Importation du package path pour donner accès au chemin du système de fichier images
const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Création de l'application Express sécurisée par elmet
const app = express();
app.use(helmet());

// Connection à la base de données de mongoDB
mongoose.connect(process.env.DB_USER_PASS,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  // Accès à l'origine par tout le monde
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Autorisation de certains en-têtes
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Autorisation des certaines méthodes 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// app.use(bodyParser.json());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// Exportation de l'application
module.exports = app;