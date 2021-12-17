//Initiallisation du stockage local
let produitLocalStorage;
// Une fois que le dom est chargé on execute comme suit
document.addEventListener("DOMContentLoaded", async (event) => {
  produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
  console.table(produitLocalStorage);
  initCart(produitLocalStorage);
  initForm();
});

//Si le panier est vide
function initCart(produitLocalStorage) {
  const cart__items = document.querySelector("#cart__items");
  if (produitLocalStorage === null || produitLocalStorage == 0) {
    const panierVide = `<p>Votre panier ne contient aucun produit</p>`;
    cart__items.innerHTML = panierVide;
  } else {
    let quantiteTotal = 0;
    let prixTotal = 0;
    for (let produit of produitLocalStorage) {
      quantiteTotal += Number(produit.quantiterProduit);
      prixTotal +=
        Number(produit.prixProduit) * Number(produit.quantiterProduit);
      /*
       **Création de l'élément "article"
       **Import de la class "cart__item" et de sont attribut
       **Dans l'élément possédant l'id "cart__items"
       */
      let articleProduit = document.createElement("article");
      cart__items.appendChild(articleProduit);
      articleProduit.className = "cart__item";
      articleProduit.setAttribute(`data-id`, produit.idProduit);

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
      imgProduit.src = produit.imgProduit;
      imgProduit.alt = produit.altImgProduit;

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
      contenaireInfoTitrePrixProduit.className =
        "cart__item__content__description";

      /*
       **Création d'un "h2" pour le nom du produit
       **Import du nom du produit
       **Dans la div possédant la class "cart__item__content__description"
       */
      let nomProduit = document.createElement("h2");
      contenaireInfoTitrePrixProduit.appendChild(nomProduit);
      nomProduit.innerHTML = produit.nomProduit;

      /*
       **Création d'un "p" pour la couleur
       **Import de la couleur
       **Après le titre "h2"
       */
      let couleurProduit = document.createElement("p");
      nomProduit.appendChild(couleurProduit);
      couleurProduit.innerHTML = produit.couleurProduit;
      couleurProduit.style.fontSize = "17px";

      /*
       **Création d'un "p" pour le prix
       **Import du prix
       **Dans la div possédant la class "cart__item__content__description"
       */
      let prixProduit = document.createElement("p");
      contenaireInfoTitrePrixProduit.appendChild(prixProduit);
      prixProduit.innerHTML = produit.prixProduit + " €";

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
      contenaireParametreProduit.appendChild(
        contenaireParametreQuantiterProduit
      );
      contenaireParametreQuantiterProduit.className =
        "cart__item__content__settings__quantity";

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
      quantiterProduit.value = produit.quantiterProduit;
      quantiterProduit.classList = "itemQuantity";
      quantiterProduit.setAttribute("type", "number");
      quantiterProduit.setAttribute("min", "1");
      quantiterProduit.setAttribute("max", "100");
      quantiterProduit.setAttribute("name", "itemQuantity");
      quantiterProduit.addEventListener("change", (event) => {
        event.preventDefault();
        modifierQuantiter(
          produit.idProduit,
          produit.couleurProduit,
          event.target.value
        );
      });

      /*
       **Création d'une "div" pour la suppression
       **Import de la class "cart__item__content__settings__delete"
       **Dans la div possédant la class "cart__item__content__settings"
       */
      let contenaireParametreSuppressionProduit = document.createElement("div");
      contenaireParametreProduit.appendChild(
        contenaireParametreSuppressionProduit
      );
      contenaireParametreSuppressionProduit.className =
        "cart__item__content__settings__delete";

      /*
       **Création d'un "p" pour la suppression
       **Import de la class "deleteItem"
       **Dans la div possédant la class "cart__item__content__settings__delete"
       */
      let supprimerProduit = document.createElement("p");
      contenaireParametreSuppressionProduit.appendChild(supprimerProduit);
      supprimerProduit.className = "deleteItem";
      supprimerProduit.innerHTML = "Supprimer";
      supprimerProduit.addEventListener("click", (event) => {
        event.preventDefault();
        suppressionProduit(produit.idProduit, produit.couleurProduit);
      });
    }
    document.getElementById("totalQuantity").innerHTML = quantiteTotal;
    document.getElementById("totalPrice").innerHTML = prixTotal;
    document.getElementById("order").addEventListener("click", async (event) => {
      event.preventDefault();
      await postForm();
    });
  }
}

//Modification de la quantiter d'un produit
function modifierQuantiter(idProduit, couleurProduit, nouvelleQuantite) {
  /*
   **Sélection du produit qui subit la modification en fonction de:
   **--Son id
   **--Sa couleur
   */
  const indexProduit = produitLocalStorage.findIndex(
    (element) =>
      element.idProduit == idProduit && element.couleurProduit == couleurProduit
  );
  produitLocalStorage[indexProduit].quantiterProduit = nouvelleQuantite;
  localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

  //Refresh rapide
  location.reload();
}

//Suppression d'un produit du panier
function suppressionProduit(idProduit, couleurProduit) {
  /*
   **Sélection du produit à supprimer en fonction de:
   **--Son id
   **--Sa couleur
   */
  const indexProduit = produitLocalStorage.findIndex(
    (element) =>
      element.idProduit == idProduit && element.couleurProduit == couleurProduit
  );
  produitLocalStorage.splice(indexProduit, 1);
  localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

  /*
   **Alerte de suppression
   **Et refresh rapide
   */
  alert("Le produit à bien été supprimer de votre pannier");
  location.reload();
}

/*
 **Définition du formulaire
 **Protection avec des regex(RegExp)
 */
function initForm() {
  //Cible des regex
  let formulaire = document.querySelector(".cart__order__form");

  /*
   **creation des Regex
   **Text, Adresse, Email
   */
  let prenomRegex = new RegExp("^[a-zA-Z .,'-]+$");
  let nomRegex = new RegExp("^[a-zA-Z .,'-]+$");
  let adresseRegex = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+$"
  );
  let villeRegex = new RegExp(
    "^[0-9]{1,5}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+$"
  );
  let emailRegex = new RegExp(
    "^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$"
  );

  //Ecouter les modification
  //Prenom
  formulaire.firstName.addEventListener("input", function () {
    validation(this, prenomRegex, "Veuillez renseigner votre prenom");
  });

  //Nom
  formulaire.lastName.addEventListener("input", function () {
    validation(this, nomRegex, "Veuillez renseigner votre Nom");
  });

  //Adresse
  formulaire.address.addEventListener("input", function () {
    validation(this, adresseRegex, "Veuillez renseigner votre adresse");
  });

  //Ville
  formulaire.city.addEventListener("input", function () {
    validation(this, villeRegex, "Veuillez renseigner votre ville");
  });

  //Email
  formulaire.email.addEventListener("input", function () {
    validation(this, emailRegex, "Veuillez renseigner votre email");
  });
}

/*
 **Validation
 **Ou retour message d'erreur
 */
const validation = function (element, regex, erreur) {
  let msgError = element.nextElementSibling;
  if (regex.test(element.value)) {
    msgError.innerHTML = "";
  } else {
    msgError.innerHTML = erreur;
  }
};

//Envoi des informations vers le stockage local
async function postForm() {
  //Import des informations du formulaire
  let inputFirstName = document.getElementById("firstName");
  let inputLastName = document.getElementById("lastName");
  let inputAddress = document.getElementById("address");
  let inputCity = document.getElementById("city");
  let inputEmail = document.getElementById("email");

  //Construction d'un array depuis le stockage local
  let idProduit = [];
  for (let i = 0; i < produitLocalStorage.length; i++) {
    idProduit.push(produitLocalStorage[i].idProduit);
  }
  console.log(idProduit);

  const order = {
    contact: {
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      address: inputAddress.value,
      city: inputCity.value,
      email: inputEmail.value,
    },
    products: idProduit,
  };

  const options = {
    method: "Post",
    body: JSON.stringify(order),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

    const reponse = await fetch("http://localhost:3000/api/products/order", options);
    let data = await reponse.json();
    console.log(data)
    localStorage.clear();
    document.location.href = `confirmation.html?orderId=${data.orderId}`;
}
