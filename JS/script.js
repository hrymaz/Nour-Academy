const container = document.querySelector("#courses-container");
const selectFiltre = document.querySelector("#filtre-niveau");
const selectMatiere = document.querySelector("#filtre-matiere");
const autosearch = document.querySelector("#search");

async function fetchData() {
    const data = await fetch("../Data.json");
    const result = await data.json();
    return result;
}

let arr = [];

async function afficherCours() {
    let cours = await fetchData();
    arr = structuredClone(cours);
    ajouter(cours);
}

function globalFilter() {
    const searchTerm = autosearch.value.toLowerCase().trim();
    const selectFiltr = selectFiltre.value;
    const selectMatier = selectMatiere.value;

    let filtercoures = arr.filter(course1 => {
        const Text = course1.titre?.toLowerCase().includes(searchTerm);
        const Niveau = selectFiltr === "" || course1.niveau === selectFiltr;
        const Matiere = selectMatier === "" || course1.titre?.toLowerCase().includes(selectMatier.toLowerCase());
        return Text && Niveau && Matiere;
    });

    ajouter(filtercoures);
}

function ajouter(courses) {
    container.innerHTML = "";
    if (courses.length === 0) {
        container.innerHTML = "<p>Aucun cours trouvé</p>";
        return courses;
    }
    courses.forEach(course => {
        container.insertAdjacentHTML("beforeend", `
            <div class="course-card">
               <img src="${course.img.src}" alt="${course.img.alt || course.titre}">
                <h2>${course.titre}</h2>
                <p>Niveau : ${course.niveau}</p>
                <p>Prix : ${course.prix} MAD / mois</p>
                <button>Choisir ce cours</button>
            </div>
        `);
    });
    return courses;
}

selectFiltre.addEventListener("change", globalFilter);
selectMatiere.addEventListener("change", globalFilter);
autosearch.addEventListener("input", globalFilter);

afficherCours();
