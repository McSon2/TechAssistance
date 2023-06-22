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

        let title = document.createElement("h2");
        title.innerText = article.titre;
        articleCard.appendChild(title);

        let date = document.createElement("p");
        date.className = "article-date";
        date.innerText = `Publié le ${article.date_publication}`;
        articleCard.appendChild(date);

        let tags = document.createElement("p");
        tags.className = "article-tags";
        tags.innerText = `Tags: ${article.tags}`;
        articleCard.appendChild(tags);

        // Ajoutez un événement click à la carte d'article
        articleCard.addEventListener('click', function() {
          fetch("php/fetch_article.php?id=" + this.dataset.id)
            .then(response => response.json())
            .then(data => {
              // Ici, vous pouvez afficher le contenu de l'article dans votre page
              // Par exemple, vous pouvez remplacer le contenu de la section blog par le contenu de l'article
              let blogSection = document.querySelector("#blog");
              blogSection.innerHTML = `
                <h1>${data.titre}</h1>
                <p class="article-date">Publié le ${data.date_publication}</p>
                <p class="article-tags">Tags: ${data.tags}</p>
                <p>${data.contenu}</p>
              `;
            })
            .catch(error => console.error(error));
        });

        articlesContainer.appendChild(articleCard);
      });

      document.querySelector("#blog").appendChild(articlesContainer);
    })
    .catch((error) => console.error(error));
};
