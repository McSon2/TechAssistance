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
        let articleCard = document.createElement("a");
        articleCard.className = "article-card";
        articleCard.href = `article.php?id=${article.id}`;

        let title = document.createElement("h2");
        title.innerText = article.titre;
        articleCard.appendChild(title);

        let date = document.createElement("p");
        date.innerText = `Publié le ${article.date_publication}`;
        articleCard.appendChild(date);

        let tags = document.createElement("p");
        tags.innerText = `Tags: ${article.tags}`;
        articleCard.appendChild(tags);

        let content = document.createElement("p");
        content.innerText = article.contenu;
        articleCard.appendChild(content);

        articlesContainer.appendChild(articleCard);
      });

      document.querySelector("#blog").appendChild(articlesContainer);
    })

    .catch((error) => console.error(error));
};
