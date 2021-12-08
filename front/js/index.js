/*
**    const url = "http://localhost:3000/api/products";
**    fetch(url).then(function (response) {
**      console.log("response", response);
**      response.json().then(function (data) {
**        console.log("data", data);
**        for (let i = 0; i < data.length; i++) {
**          const product = data[i];
**          document.getElementById("items").innerHTML += `
**            <a href="./product.html?id=42">
**              <article>
**                <img src="${product.imageUrl}" alt="${product.altTxt}">
**                <h3 class="productName">${product.name}</h3>
**                <p class="productDescription">${product.description}</p>
**              </article>
**            </a>
**          `;
**        }
**      });
**    });
*/
creationSection();
//Récuperation des produits

async function getArticles(){
  let appelproduits = await fetch("http://localhost:3000/api/products")
  return await appelproduits.json();
}

/*
**Récuperation des informations des produits
**Et création des élément de la page
*/
async function creationSection(){
  let resultat = await getArticles()
    .then(function (reponseAPI) {
      const produits = reponseAPI;
      console.table(produits);
      for (let produit in produits) {
        
        /*
        **Création de l'élément "a"
        **dans l'élément possédant la classe "items"
        */
        let lienProduit = document.createElement("a");
        document.querySelector(".items").appendChild(lienProduit);
        lienProduit.href = `product.html?id=${reponseAPI[produit]._id}`;

        /*
        **Création de l'élément "article" 
        **Dans l'élément "a"
        */
        let articleProduit = document.createElement("article");
        lienProduit.appendChild(articleProduit);

        /*
        **Création de l'élément "img" 
        **Import de ça source et sont alt
        **Dans l'élémént "article"
        */
        let imgProduit = document.createElement("img");
        articleProduit.appendChild(imgProduit);
        imgProduit.src = reponseAPI[produit].imageUrl;
        imgProduit.alt = reponseAPI[produit].altTxt;

        /*
        **Création de l'élément "h3" 
        **Import de son nom et ajout de la classe "productName"
        **Dans l'élément "article"
        */
        let nomProduit = document.createElement("h3");
        articleProduit.appendChild(nomProduit);
        nomProduit.classList.add("productName");
        nomProduit.innerHTML = reponseAPI[produit].name;
        
        /*
        **Création de l'élément "p"
        **Import de la description et ajout de la classe "productDescription"
        **Dans l'élément "article"
        */ 
        let descriptionProduit = document.createElement("p");
        articleProduit.appendChild(descriptionProduit);
        descriptionProduit.classList.add("productDescription");
        descriptionProduit.innerHTML = reponseAPI[produit].description;        
      }
    })
    .catch(function(erreur) {
      return erreur
    })
}