let str = window.location.href;
let url = new URL(str);
let idProduit = url.searchParams.get("id")
console.log(idProduit);
let produit = "";

const couleurChoisie = document.querySelector("#colors");
const quantiterChoisie = document.querySelector("#quantity");


getArticle();

//Récuperation des produits API
function getArticle() {
    fetch(`http://localhost:3000/api/products/${idProduit}`)
        .then((resultat) => {
            return resultat.json();
        })

        .then(async function(reponseAPI) {
            produit = await reponseAPI;
            console.table(produit);
            if (produit){
                getPost(produit);
            }
        })
}

//Création des éléments de la page
function getPost(produit) {

    let imgProduit = document.createElement("img");
    document.querySelector(".item__img").appendChild(imgProduit);
    imgProduit.src = produit.imageUrl;
    imgProduit.alt = produit.altTxt;

    let nomProduit = document.getElementById("title");
    nomProduit.innerHTML = produit.name;

    let prixProduit = document.getElementById("price");
    prixProduit.innerHTML = produit.price;

    let descriptionProduit = document.getElementById("description");
    descriptionProduit.innerHTML = produit.description;

    for (let couleurs of produit.colors){
        console.table(couleurs);
        let couleurProduit = document.createElement("option");
        document.querySelector("#colors").appendChild(couleurProduit);
        couleurProduit.value = couleurs;
        couleurProduit.innerHTML = couleurs;
    }
    addToCart(produit)
}

//Gestion du choix du produit
function addToCart(produit) {
    const btn_EnvoiAuPanier = document.querySelector("#addToCart");

    btn_EnvoiAuPanier.addEventListener("click", (event) => {
        if (quantiterChoisie.value > 0 && quantiterChoisie.value <= 100 && quantiterChoisie.value != 0 ){

            let choixCouleur = couleurChoisie.value;
            let choixQuantiter = quantiterChoisie.value;

            let optionsProduit = {
                idProduit: idProduit,
                couleurProduit: choixCouleur,
                quantiterProduit: Number(choixQuantiter),
                nomProduit: produit.name,
                descriptionProduit: produit.description,
                prixProduit: produit.price,
                imgProduit: produit.imageUrl,
                imgAltProduit: produit.altTxt,
            };

            let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

            if (produitLocalStorage) {
                const resultatPanier = produitLocalStorage.find(
                    (element) => element.idProduit === idProduit && element.couleurProduit === choixCouleur);
                    
                    if (resultatPanier) {
                        let nouvelleQuantiter =
                        parseInt(optionsProduit.quantiterProduit) + parseInt(resultatPanier.quantiterProduit);
                        resultatPanier.quantiterProduit = nouvelleQuantiter;
                        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                        console.table(produitLocalStorage);
                    } else {
                        produitLocalStorage.push(optionsProduit);
                        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                        console.table(produitLocalStorage);
                    }
            } else {
                produitLocalStorage =[];
                produitLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                console.table(produitLocalStorage);
            }
        }
    });
}