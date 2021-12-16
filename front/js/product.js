// Une fois que le dom est chargé on execute comme suit
document.addEventListener('DOMContentLoaded', async (event) => {
    // Recuperation de l'id du produit
    const idProduit = (new URL(window.location.href)).searchParams.get("id");
    console.log(idProduit);
    // Recuperation du dit produit via l'API
    const produit = await getArticle(idProduit);
    // Mise en place des elements html sur la page
    getPost(produit);
});

//Récuperation des produits API
async function getArticle(idProduit) {
    const resultat = await fetch(`http://localhost:3000/api/products/${idProduit}`);
    const produit = await resultat.json();
    console.table(produit);
    // Le role principale de cette fonction devrait etre la recuperation du produit du backend.
    // De ce fait il ne dois plus se charger d'appeler la fonction getPost() qui lui se charge de la creation des elements de la page.
    return produit;
}

// Création des éléments de la page.
// Je pense qu'il faut changer le nom de cette fonction. Il n'est pas tres explicite
// Un nom approprié pourrait etre "initProductPage()"
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
    
    // Ici, au lieu d'appeler la fonction "addToCard()", on la greffe juste a l'evenement click du bouton de commande
    document.querySelector("#addToCart").addEventListener("click", (event) => {
        addToCart(produit)
    })
}

// Gestion du choix du produit
// Devra etre lancé uniquement au click du bouton commander
function addToCart(produit) {
    // Import du choix de la couleur et de la quantiter
    const choixCouleur = document.querySelector("#colors").value;
    const choixQuantiter = document.querySelector("#quantity").value;

    /*
    **Ecouter le choix avec deux condition:
    **--Choix de la couleur non nulle
    **--Choix de la quantiter entre 1 et 100
    */
    if (choixQuantiter > 0 && choixQuantiter <= 100 && choixCouleur != "" ) {
        // Import des options du produit choisi
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

        // Initialisation du stockage local
        let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

        // import dans le stockage local
        // Si le panier à déjà un produit
        if (produitLocalStorage) {
            const resultatPanier = produitLocalStorage.find(
                (element) => element.idProduit === idProduit && element.couleurProduit === choixCouleur);
            // Si le produit commander est identique
            if (resultatPanier) {
                let nouvelleQuantiter =
                parseInt(optionsProduit.quantiterProduit) + parseInt(resultatPanier.quantiterProduit);
                resultatPanier.quantiterProduit = nouvelleQuantiter;
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                console.table(produitLocalStorage);
             // Si le produit commander est différent
            } else  {
                produitLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                console.table(produitLocalStorage);
            }
         // Si le panier est vide
        } else {
            produitLocalStorage =[];
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
        }
    }
}
