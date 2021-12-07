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

        let lienProduit = document.createElement("a");
        document.querySelector(".items").appendChild(lienProduit);
        lienProduit.href = `product.html?id=${reponseAPI[produit]._id}`;

        let articleProduit = document.createElement("article");
        lienProduit.appendChild(articleProduit);

        let imgProduit = document.createElement("img");
        articleProduit.appendChild(imgProduit);
        imgProduit.src = reponseAPI[produit].imageUrl;
        imgProduit.alt = reponseAPI[produit].altTxt;

        let nomProduit = document.createElement("h3");
        articleProduit.appendChild(nomProduit);
        nomProduit.classList.add("productName");
        nomProduit.innerHTML = reponseAPI[produit].name;

        let descriptionProduit = document.createElement("p");
        articleProduit.appendChild(descriptionProduit);
        descriptionProduit.classList.add("productDescription");
        descriptionProduit.innerHTML = reponseAPI[produit].description;        
      }
    })
}