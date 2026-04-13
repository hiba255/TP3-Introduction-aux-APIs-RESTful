const axios = require("axios");
axios.get("https://openlibrary.org/search.json?q=python")
  .then(res => {
    const data = res.data;
    console.log("Open Library ");
    if (data.docs && data.docs.length > 0) {
      console.log("Premier livre :", data.docs[0].title);
      console.log("Auteur :", data.docs[0].author_name ? data.docs[0].author_name[0] : "Inconnu");
    }
  })
  .catch(err => console.log("Erreur Open Library:", err));