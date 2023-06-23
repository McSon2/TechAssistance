window.onload = function () {
  fetch("php/fetch_articles.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur de requête: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Affiche la réponse JSON dans la console du navigateur

      // Le reste de votre code pour afficher les articles dans votre page
      let articlesContainer = document.createElement("div");
      articlesContainer.className = "articles-container";

      data.forEach((article) => {
        let articleCard = document.createElement("div");
        articleCard.className = "article-card";

        articleCard.dataset.id = article.id; // Ajoutez l'ID de l'article comme attribut de données

        // Utilisez les littéraux de gabarit pour créer le HTML de la carte d'article
        articleCard.innerHTML = `
          <h2>${article.titre}</h2>
          <p class="article-date">Publié le ${article.date_publication}</p>
          <p class="article-tags">Tags: ${article.tags}</p>
        `;

        // Ajoutez un événement click à la carte d'article
        articleCard.addEventListener("click", function () {
          fetch("php/fetch_article.php?id=" + this.dataset.id)
            .then((response) => response.json())
            .then((data) => {
              // Ici, vous pouvez afficher le contenu de l'article dans votre page
              // Par exemple, vous pouvez remplacer le contenu de la section blog par le contenu de l'article
              let blogSection = document.querySelector("#blog");
              blogSection.innerHTML = `
                <h1 class="title">${data.titre}</h1>
                <p class="date">Publié le ${data.date_publication}</p>
                <p class="tags">Tags: ${data.tags}</p>
                <p class="text">${data.contenu}</p>
              `;
            })
            .catch((error) => console.error(error));
        });

        articlesContainer.appendChild(articleCard);
      });

      document.querySelector("#blog").appendChild(articlesContainer);
    })
    .catch((error) => console.error(error));
};
