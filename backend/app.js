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

const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Création de l'application Express sécurisée par elmet
const app = express();
app.use(helmet());

// Connection à la base de données de mongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ytpd2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
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