const container = document.querySelector("#courses-container");
const selectFiltre = document.querySelector("#filtre-niveau");

fetch("../Data.json")
    .then(res => res.json())
    .then(cours => {
        ajouter(filtre(cours));
});

function filtre(courses) {
    const niveau = selectFiltre.value;

    if (niveau === "Tous") {
        return courses;
    }

    const fstchcours = courses.filter(course => course.niveau === niveau);

    return fstchcours.length > 0 ? fstchcours : courses;
}

function ajouter(courses) {
    container.innerHTML = "";
    courses.forEach(course => {
        container.insertAdjacentHTML("beforeend", `
            <div class="course-card">
                <img src="${course.img.src}" alt="${course.titre}">
                <h2>${course.titre}</h2>
                <p>Niveau : ${course.niveau}</p>
                <p>Prix : ${course.prix} MAD / mois</p>
                <button>Choisir ce cours</button>
            </div>
        `);
    });
}

selectFiltre.addEventListener("change", () => {
    fetch("../Data.json")
        .then(res => res.json())
        .then(cours => ajouter(filtre(cours)));
});