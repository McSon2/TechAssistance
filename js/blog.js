window.onload = function() {
    fetch("../php/fetch_articles.php")
    .then(response => response.json())
    .then(data => {
        let articlesContainer = document.createElement('div');
        articlesContainer.className = 'articles-container';

        data.forEach(article => {
            let articleCard = document.createElement('div');
            articleCard.className = 'article-card';

            let title = document.createElement('h2');
            title.innerText = article.titre;
            articleCard.appendChild(title);

            let date = document.createElement('p');
            date.innerText = `Publié le ${article.date_publication}`;
            articleCard.appendChild(date);

            let tags = document.createElement('p');
            tags.innerText = `Tags: ${article.tags}`;
            articleCard.appendChild(tags);

            let content = document.createElement('p');
            content.innerText = article.contenu;
            articleCard.appendChild(content);

            articlesContainer.appendChild(articleCard);
        });

        document.body.insertBefore(articlesContainer, document.querySelector('.footer'));
    })
    .catch(error => console.error(error));
}