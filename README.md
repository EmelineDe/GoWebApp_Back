
# Projet Goweb - Formulaire de Qualification de Chantier

## Description

Ce projet est une API backend permettant de gérer un formulaire de qualification de chantier. L'API repose sur une architecture Node.js avec Express, TypeScript, et une base de données PostgreSQL. Elle inclut une documentation Swagger pour faciliter l'interaction avec l'API.

## Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre machine :
- [Node.js](https://nodejs.org/) (version recommandée : 14.x ou supérieure)
- [Docker](https://www.docker.com/get-started) (pour exécuter PostgreSQL et l'application)

## Installation

### 1. **Cloner le projet**

Clonez ce projet sur votre machine locale :

```bash
git clone https://github.com/votre-utilisateur/goweb-backend.git
cd goweb-backend
```

### 2. **Installation des dépendances**

Une fois le projet cloné, installez les dépendances via npm :

```bash
npm install
```

### 3. **Configurer les variables d'environnement**

Créez un fichier `.env` à la racine du projet et configurez les variables d'environnement pour la connexion à la base de données PostgreSQL :

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=gowebdb
```

### 4. **Lancer l'application avec Docker**

Le projet utilise Docker pour exécuter la base de données PostgreSQL. Vous pouvez démarrer l'application avec la commande suivante :

```bash
docker compose up --build
```

Cela va :
- Créer les conteneurs nécessaires pour l'application et la base de données.
- Démarrer l'API backend sur `http://localhost:3000`.

### 5. **Accéder à l'API**

L'API est maintenant en cours d'exécution. Vous pouvez accéder à la documentation interactive Swagger à l'adresse suivante :

```
http://localhost:3000/api-docs
```

Vous y trouverez toutes les routes de l'API ainsi que la possibilité de les tester directement.

---

## Tests

### 1. **Exécuter les tests unitaires**

Des tests unitaires ont été configurés avec Jest. Pour les exécuter, utilisez la commande suivante :

```bash
npm run test
```

Cela lancera Jest et exécutera les tests définis dans le projet.

---

## Structure du projet

Voici un aperçu de la structure des répertoires de l'application :

```
/goweb-backend
│
├── /src
│   ├── /config        # Configuration (ex: connexion à la BDD)
│   ├── /controllers   # Logique métier des routes
│   ├── /routes        # Définition des routes de l'API
│   ├── /services      # Services métier
│   ├── /validators    # Validation des données (ex: avec Zod)
│   ├── app.ts         # Configuration de l'application Express
│   └── server.ts      # Lancement du serveur
│
├── /docker-compose.yml  # Configuration Docker
├── /Dockerfile          # Dockerfile pour l'application
├── .env                # Fichier des variables d'environnement (exclu de Git)
├── package.json        # Dépendances du projet
├── jest.config.js      # Configuration des tests Jest
└── README.md           # Ce fichier
```

---

## Aide & Support

Si vous avez des questions ou avez besoin d'aide, n'hésitez pas à ouvrir une **issue** sur GitHub ou à me contacter directement.

---

## License

Ce projet est sous la licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
#
