const API_KEY = "bb1a251843de45a3acb6188059d58228";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});


//when you start fetching news, show the loader and hide it when fetching is done 
async function fetchNews(query) {
    const loader = document.getElementById("loader");
    loader.style.display = "block";
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    } finally {
        loader.style.display = "none";
    }
}

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.style.display = "none"; // Hide loader when page is fully loaded
});

document.onreadystatechange = function () {
    const loader = document.getElementById("loader");
    if (document.readyState !== "complete") {
        loader.style.display = "block"; // Show loader when page starts loading
    }
};

async function fetchNews(query, sortBy = "publishedAt") {
    const loader = document.getElementById("loader");
    loader.style.display = "block";
    try {
        const res = await fetch(`${url}${query}&sortBy=${sortBy}&apiKey=${API_KEY}`);
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    } finally {
        loader.style.display = "none";
    }
}

document.getElementById('notificationButton').addEventListener('click', function() {
    Notification.requestPermission().then(function(result) {
        if (result === 'granted') {
            new Notification('Thank you for enabling notifications!');
        }
    });
});

function toggleMenu() {
    const menuContent = document.getElementById('menuContent');
    if (menuContent.style.display === 'flex') {
        menuContent.style.display = 'none';
    } else {
        menuContent.style.display = 'flex';
    }
}

document.addEventListener('click', function(event) {
    const menuContent = document.getElementById('menuContent');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    if (!hamburgerIcon.contains(event.target) && menuContent.style.display === 'flex') {
        menuContent.style.display = 'none';
    }
});
