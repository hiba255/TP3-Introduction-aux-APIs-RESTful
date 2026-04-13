# Introduction aux APIs RESTful



---

##  Objectifs

- Comprendre les principes fondamentaux des APIs RESTful
- Maîtriser le format d'échange de données JSON
- Consommer des APIs tierces avec `fetch` et `axios` en JavaScript (Node.js)

---

##  Outils & Technologies

| Outil | Rôle |
|---|---|
| Node.js | Environnement d'exécution JavaScript côté serveur |
| npm | Gestionnaire de paquets Node.js |
| fetch (natif Node 18+) | Bibliothèque HTTP native pour les requêtes API |
| axios | Bibliothèque HTTP tierce pour les requêtes API |
| OpenWeatherMap API | Fournisseur de données météorologiques mondiales |

---

##  Structure du projet

```
restful-apis/
│
├── weather/
│   ├── fetch-weather.js        # Météo avec fetch (Étapes 3 & 4)
│   ├── fetch-weather-fr.js     # Météo en français et unités métriques (Étape 5)
│   └── axios-weather.js        # Météo avec axios (Étape 6)
│
├── apis/
│   ├── open-library.js         # Consommation de l'API Open Library (Étape 7)
│   ├── nasa.js                 # Consommation de l'API NASA (Étape 7)
│   └── random-user.js          # Consommation de l'API RandomUser (Étape 7)
│
├── .env                        # Variables d'environnement (clé API)
├── package.json
└── README.md
```

---

##  Installation & Configuration

### 1. Cloner / initialiser le projet

```bash
mkdir tp3-restful-apis
cd tp3-restful-apis
npm init -y
```

### 2. Installer les dépendances

```bash
npm install axios dotenv
```

### 3. Obtenir une clé API OpenWeatherMap

1. S'inscrire sur [https://openweathermap.org/api](https://openweathermap.org/api)
2. Accéder à la section **API Keys** dans le tableau de bord
3. Copier la clé générée automatiquement (ou en créer une nouvelle)
4. Créer un fichier `.env` à la racine du projet :

```env
OWM_API_KEY=votre_clé_api_ici
```

>  **Attention :** Ne jamais commiter le fichier `.env` dans Git. Ajoutez-le à votre `.gitignore`.

---

##  Points de terminaison (Endpoints) OpenWeatherMap

| Endpoint | Description |
|---|---|
| `GET /weather` | Météo actuelle pour une ville |
| `GET /forecast` | Prévisions sur 5 jours (toutes les 3h) |
| `GET /onecall` | Données complètes (actuel + prévisions + historique) |

### Paramètres principaux

| Paramètre | Description | Exemple |
|---|---|---|
| `q` | Nom de la ville | `q=Sousse` |
| `appid` | Clé API | `appid=abc123` |
| `units` | Unités de mesure | `units=metric` |
| `lang` | Langue de la réponse | `lang=fr` |

**URL de base :**
```
https://api.openweathermap.org/data/2.5/weather?q={ville}&appid={clé}
```

---

##  Étape 3 & 4 — Requête avec `fetch` + affichage pour Sousse

```javascript
// fetch-weather.js
require('dotenv').config();

const API_KEY = process.env.OWM_API_KEY;
const CITY = "Sousse";
const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`;

function callback(data) {
  console.log("=== Météo à", CITY, "===");
  console.log("Description :", data.weather[0].description);
  console.log("Température :", data.main.temp, "K");
  console.log("Humidité    :", data.main.humidity, "%");
}

fetch(URL)
  .then(response => response.json())
  .then(data => callback(data))
  .catch(error => console.error("Erreur :", error));
```

**Exécution :**
```bash
node weather/fetch-weather.js
```

---

##  Étape 5 — Données métriques et en français

```javascript
// fetch-weather-fr.js
require('dotenv').config();

const API_KEY = process.env.OWM_API_KEY;
const CITY    = "Sousse";
const URL     = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=fr`;

function callback(data) {
  console.log("=== Météo à", CITY, "(métrique / français) ===");
  console.log("Description :", data.weather[0].description);
  console.log("Température :", data.main.temp, "°C");
  console.log("Humidité    :", data.main.humidity, "%");
}

fetch(URL)
  .then(response => response.json())
  .then(data => callback(data))
  .catch(error => console.error("Erreur :", error));
```

> Les paramètres `units=metric` retournent la température en **°C** et la vitesse du vent en **m/s**.  
> Le paramètre `lang=fr` traduit le champ `description` en français.

**Exécution :**
```bash
node weather/fetch-weather-fr.js
```

---

##  Étape 6 — Remplacement de `fetch` par `axios`

```javascript
// axios-weather.js
require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.OWM_API_KEY;
const CITY    = "Sousse";
const URL     = `https://api.openweathermap.org/data/2.5/weather`;

axios.get(URL, {
  params: {
    q     : CITY,
    appid : API_KEY,
    units : "metric",
    lang  : "fr"
  }
})
.then(response => {
  const data = response.data;
  console.log("=== Météo à", CITY, "(axios) ===");
  console.log("Description :", data.weather[0].description);
  console.log("Température :", data.main.temp, "°C");
  console.log("Humidité    :", data.main.humidity, "%");
})
.catch(error => console.error("Erreur axios :", error.message));
```

**Exécution :**
```bash
node weather/axios-weather.js
```

### Comparatif `fetch` vs `axios`

| Critère | fetch | axios |
|---|---|---|
| Disponibilité | Natif (Node 18+) | Librairie tierce (npm) |
| Parsing JSON | Manuel (`.json()`) | Automatique |
| Gestion des erreurs HTTP | Manuel (vérif. `response.ok`) | Automatique (erreur si 4xx/5xx) |
| Paramètres URL | Chaîne manuelle | Objet `params` structuré |
| Annulation de requête | `AbortController` | `CancelToken` ou `AbortController` |

---

##  Étape 7 — Consommation d'autres APIs RESTful

### 7.1 Open Library API

Documentation : [https://openlibrary.org/developers/api](https://openlibrary.org/developers/api)

```javascript
// open-library.js
const axios = require('axios');

const QUERY = "javascript";

axios.get("https://openlibrary.org/search.json", {
  params: { q: QUERY, limit: 3 }
})
.then(response => {
  const livres = response.data.docs;
  console.log(`=== Résultats Open Library pour "${QUERY}" ===`);
  livres.forEach((livre, i) => {
    console.log(`\n[${i + 1}] Titre   : ${livre.title}`);
    console.log(`     Auteur  : ${livre.author_name ? livre.author_name[0] : "Inconnu"}`);
    console.log(`     Année   : ${livre.first_publish_year || "N/A"}`);
  });
})
.catch(error => console.error("Erreur Open Library :", error.message));
```

**Exécution :**
```bash
node apis/open-library.js
```

---

### 7.2 NASA API — Photo du jour (APOD)

Documentation : [https://api.nasa.gov/](https://api.nasa.gov/)  
> Clé de démonstration disponible sans inscription : `DEMO_KEY`

```javascript
// nasa.js
const axios = require('axios');

axios.get("https://api.nasa.gov/planetary/apod", {
  params: { api_key: "DEMO_KEY" }
})
.then(response => {
  const data = response.data;
  console.log("=== NASA — Astronomy Picture of the Day ===");
  console.log("Titre       :", data.title);
  console.log("Date        :", data.date);
  console.log("Explication :", data.explanation.substring(0, 150) + "...");
  console.log("URL image   :", data.url);
})
.catch(error => console.error("Erreur NASA API :", error.message));
```

**Exécution :**
```bash
node apis/nasa.js
```

---

### 7.3 RandomUser API

Documentation : [https://randomuser.me/](https://randomuser.me/)

```javascript
// random-user.js
const axios = require('axios');

axios.get("https://randomuser.me/api/", {
  params: { results: 3, nat: "fr" }
})
.then(response => {
  const users = response.data.results;
  console.log("=== Utilisateurs aléatoires ===");
  users.forEach((user, i) => {
    console.log(`\n[${i + 1}] Nom      : ${user.name.first} ${user.name.last}`);
    console.log(`     Email    : ${user.email}`);
    console.log(`     Pays     : ${user.location.country}`);
    console.log(`     Photo    : ${user.picture.thumbnail}`);
  });
})
.catch(error => console.error("Erreur RandomUser :", error.message));
```

**Exécution :**
```bash
node apis/random-user.js
```

---

##  Résumé des APIs utilisées

| API | Authentification | Format | Documentation |
|---|---|---|---|
| OpenWeatherMap | Clé API (paramètre `appid`) | JSON | [lien](https://openweathermap.org/api) |
| Open Library | Aucune | JSON | [lien](https://openlibrary.org/developers/api) |
| NASA APOD | Clé API (ou `DEMO_KEY`) | JSON | [lien](https://api.nasa.gov/) |
| RandomUser | Aucune | JSON | [lien](https://randomuser.me/) |

---

##  Concepts clés à retenir

- **API RESTful** : Interface respectant l'architecture REST (méthodes HTTP GET, POST, PUT, DELETE, ressources identifiées par URLs).
- **JSON** : Format de données léger et lisible, standard d'échange dans les APIs web.
- **Endpoint** : URL spécifique d'une API qui expose une ressource ou une fonctionnalité.
- **Paramètres de requête** : Informations passées dans l'URL après `?` (ex. `?q=Sousse&units=metric`).
- **fetch** : API native de JavaScript pour effectuer des requêtes HTTP asynchrones.
- **axios** : Librairie populaire offrant une syntaxe plus propre et une gestion automatique du JSON et des erreurs HTTP.

---

## 

réalisés dans le cadre du cours **SoA et Microservices** — 4ème année Informatique.
