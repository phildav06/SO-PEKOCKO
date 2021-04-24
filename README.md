# SO-PEKOCKO</h1>
# P6 OpenClassrooms - Construisez une API sécurisée pour une application d'avis gastronomiques

La marque So Pekocko, qui crée des sauces piquantes, connaît un franc succès, en partie grâce à sa chaîne de vidéos YouTube “La piquante”.
L’entreprise souhaite désormais développer une application d’évaluation de ses sauces piquantes, appelée “Piquante”.

Le MVP du projet est une application web permettant aux utilisateurs d’ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par les autres utilisateurs.</br></br>

1- PRÉPARATION DE VOTRE ENVIRONNEMENT DE TRAVAIL

1.1- Utilsez un éditeur de code comme par exemple :</br>
Visual Studio Code <img src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4CT2M?ver=b1c6&q=100&h=75&w=75&b=%23FFFFFFFF&aim=true" alt="VS code" width="40" align="center">

1.2- Installation de node.js</br>
Vous devrez tout d'abord installer <img src="https://nodejs.org/static/images/logo.svg" alt="node.js" width="60" align="center"> sur votre ordinateur</br>
(cette API à été développée sous version 15.11.0)</br>

1.3- Installez <img src="https://git-scm.com/images/logo@2x.png" alt="git" width="60" align="center"> sur votre machine</br>

1.4- Clônage du projet</br>
      - Choississez un dossier vierge dans lequel vous souhaitez placer le projet</br>
      - Faites un clic droit sur ce dossier et ouvrez-le avec votre éditeur de code</br>
      - Ouvrez un nouveau terminal et clônez le projet avec la commande :</br>
                <em>git clone https://github.com/phildav06/SO-PEKOCKO.git</em></br>

1.5- Partie <b class="term">frontend </b>:</br>
Ouvrez un nouveau terminal et placez-vous dans le dossier <b class="term">frontend </b> avec les commandes :</br>
                <em>cd SO-PEKOCKO</em></br></br>
                puis :</br>
                <em>cd frontend</em></br></br>

1.5- Installation de <b class="term">npm </b>:</br>
          - Installez <b class="term">npm</b> avec la commande :</br>
                <em>npm install --force</em></br></br>

1.6- Installation d'<b class="term"><img src="https://angular.io/assets/images/logos/angular/logo-nav@2x.png" alt="Angular" width="80" align="center"> </b>:</br>
Dans ce terminal installez <b class="term">Angular </b> avec les commandes :</br>
                <em>npm install -g @angular/cli</em></br>
                - puis chargez le serveur avec :</br>
                <em>ng serve</em></br></br>
                - démarrez le serveur avec :</br>
                <em>npm start</em></br></br>
                Attendez le chargement total</br></br>

1.7- Partie <b class="term">backend </b>:</br>
Ouvrez un nouveau terminal et placez-vous dans le dossier <b class="term">backend </b> avec les commandes :</br>
                <em>cd SO-PEKOCKO</em></br></br>
                puis :</br>
                <em>cd backend</em></br></br>

1.8- Installation des paquets de node.js :</br>
Dans le terminal, installez les paquets suivants :</br>
          - <b class="term">nodemon</b> avec la commande :</br>
                <em>npm i -g nodemon</em></br></br>
          - <b class="term">express</b>, <b class="term">bodyParser</b>, <b class="term">bcrypt</b>, <b class="term">jsonwebtoken</b>, <b class="term">multer</b>, <b class="term">helmet</b>, avec la commande :</br>
                <em>npm i -s express body-parser bcrypt jsonwebtoken multer helmet</em></br></br>
          - <b class="term">dotenv</b> avec la commande :</br>
                <em>npm i dotenv</em></br></br>

1.9- Configurez votre base de données avec <img src="https://webassets.mongodb.com/_com_assets/cms/mongodb_atlas-h0ai1yctwo.svg" alt="mongoDB_Atlas" width="120" align="center" > :</br>   
Pour configurer votre base de donnée, vous pouvez suivre les indications d'OPENCLASSROOMS à l'adresse suivante :</br>
https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466348-configurez-votre-base-de-donnees </br>
Récupérez et concervez le lien de connection à votre base de données ainsi que vos  login et mot de passe.</br>
Maintenant que votre DB est prête, installez les paquets suivants :</br>
          - <b class="term">mongoose</b> avec la commande :</br>
                <em>npm i -s mongoose</em></br></br>
          - <b class="term">mongoose-unique-validator</b> avec la commande :</br>
                <em>npm i -s mongoose-unique-validator</em></br></br>

1.10- Protection des connections :</br>
Dans la partie backend, vous trouverez un fichier nommé <strong>.env.exemple</strong></br>
Renommez le en <strong>.env</strong> puis modifiez l'adresse du lien de <strong>DB_USER_PASS</strong> avec celle de votre DB de mongoDB_Atlas en y mettant votre login et votre mot de passe.
Vous devez aussi modifier le <strong>TOKEN</strong> présent.

1.11- Démarrage du serveur nodemon :</br>
Lancez le serveur nodemon avec la commande :</br>
<em>nodemon server</em></br></br>
Vous devriez voir en bas du terminal le texte suivant : <em>"Connection réussie !"</em></br></br>

2- UTILISATION DE L'API</br>
Ouvrez votre navigateur web et collez cette adresse :</br>
                <em>http://localhost:4200/</em></br></br>
Vous devriez maintenant voir l'interface d'utilisation de l'API.</br>
Il vous suffit de vous inscrire pour l'utiliser.</br></br>
C'est terminé !
