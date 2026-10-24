const container = document.querySelector("#courses-container");
const selectFiltre = document.querySelector("#filtre-niveau");
const selectMatiere = document.querySelector("#filtre-matiere");
const autosearch = document.querySelector("#search-bar")

async function fetchData() {
    const data = await fetch("../Data.json");
    const result = await data.json();
    return result;
}
let arr =[] 

async function afficherCours(x = []) {
    let cours = await fetchData();
    arr = structuredClone(cours)
    return ajouter(cours)
}

function filtreneo(cours){ 
  const selectFiltr = document.querySelector("#filtre-niveau").value;
  const selectMatier = document.querySelector("#filtre-matiere").value;
  let filtercoures = cours.filter(course1 => {
       const cour = selectFiltr == ""  ||  course1.niveau == selectFiltr ;
        const cour2 = selectMatier == ""  ||  course1.matiere == selectMatier ;
        return cour && cour2 ; 
  
  })
  ajouter(filtercoures)
}


function ajouter( courses ) {
   
    container.innerHTML = "";
    courses.forEach(course => {
        container.insertAdjacentHTML("beforeend", `
            <div class="course-card">
                <img src="${course.img.src}" alt="${course.alt}">
                <h2>${course.titre}</h2>
                <p>Niveau : ${course.niveau}</p>
                <p>Prix : ${course.prix} MAD / mois</p>
                <button>Choisir ce cours</button>
            </div>
        `);
    });
     return courses 
}

selectFiltre.addEventListener("change", () => { 
   console.log()
    filtreneo(arr)

});

selectMatiere.addEventListener("change", () => {
  filtreneo(arr)
});
 afficherCours()