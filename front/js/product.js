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

        //Répartition des données dans le DOM
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

    /*
    **Création de l'élément "img" 
    **Import de ça source et sont alt
    **Dans l'élémént possédant la class "item__img"
    */
    let imgProduit = document.createElement("img");
    document.querySelector(".item__img").appendChild(imgProduit);
    imgProduit.src = produit.imageUrl;
    imgProduit.alt = produit.altTxt;

    /*
    **Import du nom du produit
    **Dans l'élément possédant l'id "title"
    */
    let nomProduit = document.getElementById("title");
    nomProduit.innerHTML = produit.name;

    /*
    **Import du prix du produit
    **Dans l'élément possédant l'id "price"
    */
    let prixProduit = document.getElementById("price");
    prixProduit.innerHTML = produit.price;

    /*
    **Import de la description du produit
    **Dans lélément possédant l'id "description"
    */
    let descriptionProduit = document.getElementById("description");
    descriptionProduit.innerHTML = produit.description;

    /*
    **Création de l'élément "option"
    **Import de ces source permetant le choix de la couleur
    **Dans l'élément possédant l'id "color"
    */
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
    const btn_envoiAuPanier = document.querySelector("#addToCart");

    /*
    **Ecouter le choix avec deux condition:
    **--Choix de la couleur non nulle
    **--Choix de la quantiter entre 1 et 100
    */
    btn_envoiAuPanier.addEventListener("click", (event) => {
        if (quantiterChoisie.value > 0 && quantiterChoisie.value <= 100 && quantiterChoisie.value != 0 ){

            //Import du choix de la couleur et de la quantiter
            let choixCouleur = couleurChoisie.value;
            let choixQuantiter = quantiterChoisie.value;

            //Import des options du produit choisi
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

            //Initialisation du stockage local
            let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

            ////////// Test popup //////////
            const confirmationPopup = () => {
                if (window.confirm(`Votre comande de ${choixQuantiter} ${produit.name} ${choixCouleur} à été ajouter au panier, 
                Cliquer sur "OK" pour allez au panier.`)) {
                    window.location.replace("http://127.0.0.1:5500/front/html/cart.html");
                }
            }

            //import dans le stockage local
            //Si le panier à déjà un produit
            if (produitLocalStorage) {
                const resultatPanier = produitLocalStorage.find(
                    (element) => element.idProduit === idProduit && element.couleurProduit === choixCouleur );
                    
                    //Si le produit commander est identique
                    if (resultatPanier) {
                        let nouvelleQuantiter =
                        parseInt(optionsProduit.quantiterProduit) + parseInt(resultatPanier.quantiterProduit);
                        resultatPanier.quantiterProduit = nouvelleQuantiter;
                        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                        console.table(produitLocalStorage);
                        confirmationPopup();
                     //Si le produit commander est différent
                    } else  {
                        produitLocalStorage.push(optionsProduit);
                        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                        console.table(produitLocalStorage);
                        confirmationPopup();
                    }
             //Si le panier est vide
            } else {
                produitLocalStorage =[];
                produitLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                console.table(produitLocalStorage);
                confirmationPopup();
            }
        }
    });
}