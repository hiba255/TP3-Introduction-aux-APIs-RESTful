## Reponses

```javascript
// reponses
// TP3 – RESTful APIs: Réponses aux questions 2, 3, 4, 6a, 6b, 6c
// Q1 API key API_KEY = 1aa3b3a2a30479c44d2b14e77bed9a07

const axios = require("axios");

// Q2: Écrire un code en JavaScript qui fait une requête API et affiche la réponse complète
const weatherApiKey = "1aa3b3a2a30479c44d2b14e77bed9a07";

axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Sousse&appid=${weatherApiKey}`)
  .then(res => {
    console.log("Q2 - Réponse complète OpenWeatherMap:");
    console.log(res.data);
  })
  .catch(err => console.log("Erreur OpenWeatherMap Q2:", err));

// Q3: Modifier le code pour afficher uniquement description, température, humidité
axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Sousse&appid=${weatherApiKey}`)
  .then(res => {
    const data = res.data;
    console.log("\nQ3 - Météo Sousse (brute en Kelvin):");
    console.log("Description:", data.weather[0].description);
    console.log("Température:", data.main.temp + " K");
    console.log("Humidité:", data.main.humidity + "%");
  })
  .catch(err => console.log("Erreur OpenWeatherMap Q3:", err));

// Q4: Modifier la requête pour obtenir des données métriques et en français
axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Sousse&appid=${weatherApiKey}&units=metric&lang=fr`)
  .then(res => {
    const data = res.data;
    console.log("\nQ4 - Météo Sousse (métrique, français):");
    console.log("Description:", data.weather[0].description);
    console.log("Température:", data.main.temp + " °C");
    console.log("Humidité:", data.main.humidity + "%");
  })
  .catch(err => console.log("Erreur OpenWeatherMap Q4:", err));

// Q6a: RandomUser API
axios.get("https://randomuser.me/api/")
  .then(res => {
    const user = res.data.results[0];
    console.log("\nQ6a - RandomUser:");
    console.log("Nom:", user.name.first, user.name.last);
    console.log("Email:", user.email);
    console.log("Pays:", user.location.country);
  })
  .catch(err => console.log("Erreur RandomUser:", err));

// Q6b: NASA APOD API
const nasaKey = "DEMO_KEY"; // Remplacer par votre clé si disponible

axios.get(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}`)
  .then(res => {
    const data = res.data;
    console.log("\nQ6b - NASA APOD:");
    console.log("Titre:", data.title);
    console.log("Date:", data.date);
    console.log("URL:", data.url);
  })
  .catch(err => console.log("Erreur NASA:", err));

// Q6c: Open Library API
axios.get("https://openlibrary.org/search.json?q=python")
  .then(res => {
    const data = res.data;
    console.log("\nQ6c - Open Library:");
    if (data.docs && data.docs.length > 0) {
      console.log("Premier livre:", data.docs[0].title);
      console.log("Auteur:", data.docs[0].author_name ? data.docs[0].author_name[0] : "Inconnu");
    }
  })
  .catch(err => console.log("Erreur Open Library:", err));
```
