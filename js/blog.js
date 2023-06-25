window.onload = function () {
  let converter = new showdown.Converter();

  fetch("php/fetch_articles.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur de requête: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      data.sort((a, b) => {
        let dateA = new Date(a.date_publication);
        let dateB = new Date(b.date_publication);
        return dateB - dateA;
      });

      // Utilisez l'élément avec l'ID "blog" comme conteneur pour vos articles
      let articlesContainer = document.querySelector("#blog");

      data.forEach((article) => {
        let articleCard = document.createElement("div");
        articleCard.className = "article-card";
        articleCard.dataset.id = article.id; // Ajoutez l'ID de l'article comme attribut de données

        moment.locale('fr');

        // Calculez la différence de temps
        let timeAgo = moment(
          article.date_publication,
          "YYYY-MM-DD HH:mm:ss"
        ).fromNow();

        // Utilisez les littéraux de gabarit pour créer le HTML de la carte d'article
        articleCard.innerHTML = `
          <h2>${article.titre}</h2>
          <p class="article-date"><i class="fas fa-clock"></i> ${timeAgo}</p>
        `;

        // Ajoutez un événement click à la carte d'article
        articleCard.addEventListener("click", function () {
          fetch("php/fetch_article.php?id=" + this.dataset.id)
            .then((response) => response.json())
            .then((data) => {
              let blogSection = document.querySelector("#blog");
              blogSection.classList.add("article-view");

              let contenu = converter.makeHtml(data.contenu);

              blogSection.innerHTML = `
                <h1 class="title">${data.titre}</h1>
                <p class="text">${contenu}</p>
                <p class="tags">Tags: ${data.tags}</p>
                <p class="date">Publié le ${data.date_publication}</p>
                `;
            })
            .catch((error) => console.error(error));
        });

        // Ajoutez la carte d'article au conteneur des articles
        articlesContainer.appendChild(articleCard);
      });
    })
    .catch((error) => console.error(error));
};
