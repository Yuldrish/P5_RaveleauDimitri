let str = window.location.href;
let url = new URL(str);
let idProduit = url.searchParams.get("id")
console.log(idProduit);
let produit = "";

const couleurChoisie = document.querySelector("#colors");


getArticle();

//Récuperation des produits API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduit)
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
}