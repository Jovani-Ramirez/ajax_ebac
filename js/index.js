document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const resultsContainer = document.getElementById("results");
    const detailsContainer = document.getElementById("details");
    const detailsContent = document.getElementById("detailsContent");
    const closeDetailsButton = document.getElementById("closeDetails");

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchShows(query);
        }
    });

    async function fetchShows(query) {
        try {
            const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
            displayResults(response.data);
        } catch (error) {
            console.error("Error al obtener datos de la API", error);
        }
    }

    function displayResults(shows) {
        resultsContainer.innerHTML = "";
        shows.forEach(({ show }) => {
            const showCard = document.createElement("div");
            showCard.classList.add("card");
            showCard.innerHTML = `
                <h3>${show.name}</h3>
                <img src="${show.image?.medium || ''}" alt="${show.name}">
            `;
            showCard.addEventListener("click", () => displayDetails(show));
            resultsContainer.appendChild(showCard);
        });
    }

    function displayDetails(show) {
        detailsContent.innerHTML = `
            <h2>${show.name}</h2>
            <img src="${show.image?.original || ''}" alt="${show.name}">
            <p>${show.summary || "No hay descripción disponible."}</p>
        `;
        detailsContainer.classList.remove("hidden");
    }

    closeDetailsButton.addEventListener("click", () => {
        detailsContainer.classList.add("hidden");
    });
});
