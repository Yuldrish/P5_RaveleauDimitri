//Initiallisation du stockage local
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitLocalStorage);
const positionPanierVide = document.querySelector("#cart__items");

getCart();
//Si le panier est vide
function getCart() {
    if (produitLocalStorage === null || produitLocalStorage == 0) {
        const panierVide = `<p>Votre panier ne contient aucun produit</p>`;
        positionPanierVide.innerHTML = panierVide;
    } else {
        for (let produit in produitLocalStorage){
            
            /*
            **Création de l'élément "article"
            **Import de la class "cart__item" et de sont attribut
            **Dans l'élément possédant l'id "cart__items"
            */
            let articleProduit = document.createElement("article");
            document.querySelector("#cart__items").appendChild(articleProduit)
            articleProduit.className = "cart__item";
            articleProduit.setAttribute(`data-id`, produitLocalStorage[produit].idProduit);

            /*
            **Création d'une "div" pour l'image
            **Dans l'élément "article"
            */
            let divImgProduit = document.createElement("div");
            articleProduit.appendChild(divImgProduit);
            divImgProduit.className = "cart__item__img";

            /*
            **Création de l'élement "img"
            **Import de ça source et de sont alt
            **Dans la div possédant la class "cart__item__img"
            */
            let imgProduit = document.createElement("img");
            divImgProduit.appendChild(imgProduit);
            imgProduit.src = produitLocalStorage[produit].imgProduit;
            imgProduit.alt = produitLocalStorage[produit].altImgProduit;

            /*
            **Création d'une "div" contenaire information produit
            **Import de la class "cart__item__content"
            **Dans l'élément "article"
            */
            let contenaireInfoProduit = document.createElement("div");
            articleProduit.appendChild(contenaireInfoProduit);
            contenaireInfoProduit.className = "cart__item__content";
 
            /*
            **Création d'une "div" contenaire information poduit (titre, prix, couleur)
            **Import de la class "cart__item__content__description"
            **Dans la div possédant la class "cart__item__content"
            */
            let contenaireInfoTitrePrixProduit = document.createElement("div");
            contenaireInfoProduit.appendChild(contenaireInfoTitrePrixProduit);
            contenaireInfoTitrePrixProduit.className = "cart__item__content__description";

            /*
            **Création d'un "h2" pour le nom du produit
            **Import du nom du produit
            **Dans la div possédant la class "cart__item__content__description"
            */
            let nomProduit = document.createElement("h2");
            contenaireInfoTitrePrixProduit.appendChild(nomProduit);
            nomProduit.innerHTML = produitLocalStorage[produit].nomProduit;

            /*
            **Création d'un "p" pour la couleur
            **Import de la couleur
            **Après le titre "h2"
            */
            let couleurProduit = document.createElement("p");
            nomProduit.appendChild(couleurProduit);
            couleurProduit.innerHTML = produitLocalStorage[produit].couleurProduit;
            couleurProduit.style.fontSize = "17px";

            /*
            **Création d'un "p" pour le prix
            **Import du prix
            **Dans la div possédant la class "cart__item__content__description"
            */
            let prixProduit = document.createElement("p");
            contenaireInfoTitrePrixProduit.appendChild(prixProduit);
            prixProduit.innerHTML = produitLocalStorage[produit].prixProduit + " €";

            /*
            **Création d'une "div" contenaire paramètre
            **Import de la class "cart__item__content__settings"
            **Dans la div possédant la class "cart__item__content" 
            */
            let contenaireParametreProduit = document.createElement("div");
            contenaireInfoProduit.appendChild(contenaireParametreProduit);
            contenaireParametreProduit.className = "cart__item__content__settings";

            /*
            **Création d'une "div" contenaire paramètre quantiter
            **Import de la class "cart__item__content__settings__quantity"
            **Dans la div possédant la class "cart__item__content__settings"
            */
            let contenaireParametreQuantiterProduit = document.createElement("div");
            contenaireParametreProduit.appendChild(contenaireParametreQuantiterProduit);
            contenaireParametreQuantiterProduit.className = "cart__item__content__settings__quantity";

            /*
            **Création d'un "p" pour la quantiter
            **Dans la div possédant la class "cart__item__content__settings__quantity"
            */
            let quantitesProduit = document.createElement("p");
            contenaireParametreQuantiterProduit.appendChild(quantitesProduit);
            quantitesProduit.innerHTML = "Qté: ";
            
            /*
            **Création d'un "input" définissent la quantiter
            **Import de la quantiter et de la class "itemQuantity"
            **Dans la div possédant la class "cart__item__content__settings__quantity"
            */
            let quantiterProduit = document.createElement("input");
            contenaireParametreQuantiterProduit.appendChild(quantiterProduit);
            quantiterProduit.value = produitLocalStorage[produit].quantiterProduit;
            quantiterProduit. classList = "itemQuantity";
            quantiterProduit.setAttribute("type", "number");
            quantiterProduit.setAttribute("min", "1");
            quantiterProduit.setAttribute("max", "100");
            quantiterProduit.setAttribute("name", "itemQuantity");

            /*
            **Création d'une "div" pour la suppression
            **Import de la class "cart__item__content__settings__delete"
            **Dans la div possédant la class "cart__item__content__settings"
            */
            let contenaireParametreSuppressionProduit = document.createElement("div");
            contenaireParametreProduit.appendChild(contenaireParametreSuppressionProduit);
            contenaireParametreSuppressionProduit.className = "cart__item__content__settings__delete";

            /*
            **Création d'un "p" pour la suppression
            **Import de la class "deleteItem"
            **Dans la div possédant la class "cart__item__content__settings__delete"
            */
            let supprimerProduit = document.createElement("p");
            contenaireParametreSuppressionProduit.appendChild(supprimerProduit);
            supprimerProduit.className = "deleteItem";
            supprimerProduit.innerHTML = "Supprimer";
        } 
    }
}

getTotals();
function getTotals(){

    //Calcule du totals des quantiter
    let quantitesProduit = document.getElementsByClassName("itemQuantity");
    let myLength = quantitesProduit.length,
    quantiteTotal = 0;

    for (let i = 0; i < myLength; i++) {
        quantiteTotal += quantitesProduit[i].valueAsNumber;
    }

    let quantitesTotalProduit = document.getElementById("totalQuantity");
    quantitesTotalProduit.innerHTML = quantiteTotal;
    console.log(quantiteTotal);

    //Calcule du prix totals
    prixTotal = 0;

    for (let i = 0; i < myLength; i++) {
        prixTotal += (quantitesProduit[i].valueAsNumber * produitLocalStorage[i].prixProduit);
    }

    let prixTotalProduit = document.getElementById("totalPrice");
    prixTotalProduit.innerHTML = prixTotal;
    console.log(totalPrice);
}

modifierQuantiter();
//Modification de la quantiter d'un produit
function modifierQuantiter() {
    let quantitermodifier = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < quantitermodifier.length; k++) {
        quantitermodifier[k].addEventListener("change", (event) => {
            event.preventDefault();

            /*
            **Sélection du produit qui subit la modification en fonction de:
            **--Son id
            **--Sa couleur
            */
            let quantitesModifier = produitLocalStorage[k].quantiterProduit;
            let valeurQuantiterModifier = quantitermodifier[k].valueAsNumber;

            const resultatTrouver =produitLocalStorage.find((element) => element.valeurQuantiterModifier !== quantitesModifier);

            resultatTrouver.quantiterProduit = valeurQuantiterModifier;
            produitLocalStorage[k].quantiterProduit = resultatTrouver.quantiterProduit;

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            //Refresh rapide
            location.reload();
        });
    }
}

suppressionProduit();
//Suppression d'un produit du panier
function suppressionProduit() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let j = 0;  j < btn_supprimer.length; j++) {
        btn_supprimer[j].addEventListener("click", (event) => {
            event.preventDefault();

            /*
            **Sélection du produit à supprimer en fonction de:
            **--Son id
            **--Sa couleur 
            */
            let idSupprimer = produitLocalStorage[j].idProduit;
            let couleurSupprimer =produitLocalStorage[j].couleurProduit;

            produitLocalStorage = produitLocalStorage.filter( element => element.idProduit !== idSupprimer || element.couleurProduit !== couleurSupprimer);

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            /*
            **Alerte de suppression
            **Et refresh rapide
            */
            alert("Le produit à bien été supprimer de votre pannier");
            location.reload();
        })
    }
}

getForm();
/*
**Définition du formulaire
**Protection avec des regex(RegExp) 
*/
function getForm() {
    
    //Cible des regex
    let formulaire = document.querySelector(".cart__order__form");

    /*
    **creation des Regex
    **Text, Adresse, Email
    */
    let textRegex = new RegExp("^[a-zA-Z .,'-]+$");
    let adresseRegex = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+$");
    let emailRegex = new RegExp("^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$");

    //Ecouter les modification
    //Prenom
    formulaire.firstName.addEventListener("change", function() {
        validerFirstName(this);
    });

    //Nom
    formulaire.lastName.addEventListener("change", function() {
        validerLastName(this);
    });

    //Adresse
    formulaire.address.addEventListener("change", function() {
        validerAddress(this);
    });

    //Ville
    formulaire.city.addEventListener("change", function() {
        validerCity(this);
    });

    //Email
    formulaire.email.addEventListener("change", function() {
        validerEmail(this);
    });

    /*
    **Validation du prenom
    **Ou retour message d'erreur
    */
    const validerFirstName = function(inputFirstName) {
        let firstNameMsgError = inputFirstName.nextElementSibling;

        if(textRegex.test(inputFirstName.value)) {
            firstNameMsgError.innerHTML = "";
        } else {
            firstNameMsgError.innerHTML = "Veuillez renseigner votre prenom";
        }
    }

    /*
    **Validation du Nom
    **Ou retour message d'erreur
    */
    const validerLastName = function(inputLastName) {
        let lastNameMsgError = inputLastName.nextElementSibling;

        if(textRegex.test(inputLastName.value)) {
            lastNameMsgError.innerHTML = "";
        } else {
            lastNameMsgError.innerHTML = "Veuillez renseigner votre Nom";
        }
    }


    /*
    **Validation de l'adresse
    **Ou retour message d'erreur
    */
    const validerAddress = function(inputAddress) {
        let addressMsgError = inputAddress.nextElementSibling;

        if(adresseRegex.test(inputAddress.value)) {
            addressMsgError.innerHTML = "";
        } else {
            addressMsgError.innerHTML = "Veuillez renseigner votre adresse";
        }
    }


    /*
    **Validation de la ville
    **Ou retour message d'erreur
    */
    const validerCity = function(inputCity) {
        let cityMsgError = inputCity.nextElementSibling;

        if(textRegex.test(inputCity.value)) {
            cityMsgError.innerHTML = "";
        } else {
            cityMsgError.innerHTML = "Veuillez renseigner votre ville";
        }
    }


    /*
    **Validation de l'email
    **Ou retour message d'erreur
    */
    const validerEmail = function(inputEmail) {
        let emailMsgError = inputEmail.nextElementSibling;

        if(emailRegex.test(inputEmail.value)) {
            emailMsgError.innerHTML = "";
        } else {
            emailMsgError.innerHTML = "Veuillez renseigner votre email";
        }
    }
}

postForm();
//Envoi des informations vers le stockage local
function postForm() {
    const btn_commander = document.getElementById("order");

    //Ecouter le contenue du panier
    btn_commander.addEventListener("click", (event) => {

        //Import des informations du formulaire
        let inputFirstName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAddress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputEmail = document.getElementById('email');

        //Construction d'un array depuis le stockage local
        let idProduit = [];
        for (let i = 0; i < produitLocalStorage.length; i++) {
            idProduit.push(produitLocalStorage[i].idProduit);
        }
        console.log(idProduit);

        const order = {
            contact : {
                firstName: inputFirstName,
                lastName: inputLastName,
                address: inputAddress,
                city: inputCity,
                email: inputEmail,
            },
            produit: idProduit,
        }

        const options = {
            methode:  "Post",
            body: JSON.stringify(order),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html";
        })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
    })
}