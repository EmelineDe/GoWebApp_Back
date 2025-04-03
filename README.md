# 🚧 Backend - Projet Goweb (Test Technique)

Ce backend constitue la partie API de l'application Goweb.  
Il permet de construire dynamiquement un parcours de questions/réponses pour qualifier une demande de dépannage (cas POC : plomberie).

---

## 🧹 Stack technique

- **Node.js** + **Express**
- **TypeORM** + **PostgreSQL**
- **Zod** 
- **Swagger** 
- **Docker / Docker Compose**

---

## 📁 Structure du projet

```
src/
├── controllers/         → Logique des routes
├── entities/            → Modélisation BDD (TypeORM)
├── DTO/                 → Objets de transfert typés
├── services/            → Logique métier
├── repositories/        → Accès BDD
├── validators/          → Schémas Zod
├── routes/              → Routes Express
├── seeds/               → Script d’initialisation des questions/réponses
├── config/              → Connexion BDD, Swagger, etc.
├── app.ts               → Configuration Express
└── server.ts            → Démarrage de l'app
```

---

## ⚙️ Prérequis

- [Node.js v20+](https://nodejs.org/)
- [Docker & Docker Compose](https://www.docker.com/)
- Un outil de requête API (Postman, Thunder Client...)

---

## 🚀 Installation & Démarrage

### 1. Assurez-vous que Docker est installé et en cours d'exécution

> Vous pouvez vérifier avec : `docker --version`  
> Sur Windows/Mac : lancez **Docker Desktop** avant de continuer.

### 2. Lancer les conteneurs

```bash
docker-compose up -d
```

Ce qui démarre :
- `goweb-db` (PostgreSQL)
- `goweb-backend` (API)

📦 Base de données exposée sur `localhost:5432`

---

### 3. Initialiser les données de base

> Insère toutes les questions/réponses du parcours "Plomberie"

```bash
docker exec -it goweb-backend npm run seed
```

✅ Les données sont persistées dans PostgreSQL.

---

## 📚 Accès à l'API

- **Base URL** : `http://localhost:3000/api`
- **Swagger** : [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🧪 Tests unitaires

### ✅ Lancer les tests (Jest)

```bash
npm test
```

## 🥪 Endpoints principaux

| Méthode | Endpoint                    | Description                         |
|--------:|-----------------------------|-------------------------------------|
| `GET`   | `/questions/first/:cat`     | Première question d'une catégorie   |
| `GET`   | `/questions/:id`            | Question par ID (avec réponses)     |
| `GET`   | `/answers/:id/next`         | Question suivante via une réponse   |
| `POST`  | `/user`                     | Enregistrer un utilisateur          |
| `POST`  | `/user-answers`             | Enregistrer ses réponses            |
| `GET`   | `/user/:id`                 | Voir ses réponses enregistrées      |

---

## 💬 Infos utiles

- Les entités sont reliées avec des relations TypeORM (`OneToMany`, `ManyToOne`)
- L'enchaînement dynamique du formulaire est géré via `Answer.nextQuestionId`
- Les validations côté serveur utilisent **Zod**
- Typage strict avec des **DTOs**


---


## 🤝 Auteur

Réalisé par Emeline Delobel dans le cadre du test technique pour **Goweb**

---

