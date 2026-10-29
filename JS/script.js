

const container = document.querySelector("#courses-container");
const niveau = document.querySelector("#filtre-niveau");
const matiere = document.querySelector("#filtre-matiere");
const recherche = document.querySelector("#search");
const panier = document.querySelector("#panier-items");
const total = document.querySelector("#total");

let cours = [];
let selection = JSON.parse(localStorage.getItem("selection")) ;

async function afficherCours() {
    const response = await fetch("../Data.json");
    cours = await response.json();
    afficher(cours);
    afficherPanier();
}

function afficher(list) {
    container.innerHTML = "";

    list.forEach((coursus) => {
        let bouton = "Ajouter";

        if (coursus.places === 0) {
            bouton = "Complet";
        }

        if (selection.includes(coursus.id)) {
            bouton = "Ajouté";
        }

        container.innerHTML += `
            <article class="course-card">
                <img src="${coursus.img.src}" alt="${coursus.titre}">
                <h3>${coursus.titre}</h3>
                <p>${coursus.niveau}</p>
                <p>${coursus.prix} MAD / mois</p>
                <button data-id="${coursus.id}"
                    ${coursus.places === 0 || selection.includes(coursus.id) ? "disabled" : ""}>
                    ${bouton}
                </button>
            </article>
        `;
    });
}

function filtrer() {
    const resultat = cours.filter((coursus) => {
        return coursus.titre.toLowerCase().includes(recherche.value.toLowerCase())
            && (niveau.value === "" || coursus.niveau === niveau.value)
            && (matiere.value === "" || coursus.titre.includes(matiere.value));
    });

    afficher(resultat);
}

container.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const id = Number(event.target.dataset.id);

        if (!selection.includes(id)) {
            selection.push(id);
            localStorage.setItem("selection", JSON.stringify(selection));
            afficherPanier();
            filtrer();
        }
    }
});

function afficherPanier() {
    panier.innerHTML = "";
    let somme = 0;

    selection.forEach((id) => {
        const coursus = cours.find((element) => element.id === id);

        if (coursus) {
            somme = somme + Number(coursus.prix);

            panier.innerHTML += `
                <p>
                    ${coursus.titre} - ${coursus.prix} MAD
                    <button data-id="${coursus.id}">Supprimer</button>
                </p>
            `;
        }
    });

    total.textContent = "Total : " + somme + " MAD / mois";
}

panier.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const id = Number(event.target.dataset.id);

        selection = selection.filter((element) => element !== id);

        localStorage.setItem("selection", JSON.stringify(selection));

        afficherPanier();
        filtrer();
    }
});

recherche.addEventListener("input", filtrer);
niveau.addEventListener("change", filtrer);
matiere.addEventListener("change", filtrer);

afficherCours();