window.addEventListener("DOMContentLoaded", () => {
  creationSection();
});
//Récuperation des produits

async function getArticles() {
  let appelproduits = await fetch("http://localhost:3000/api/products");
  return await appelproduits.json();
}

/*
 **Récuperation des informations des produits
 **Et création des élément de la page
 */
async function creationSection() {
  try {
    let produits = await getArticles();
    console.table(produits);
    produits.forEach((produit) => {
      /*
       **Création de l'élément "a"
       **dans l'élément possédant la classe "items"
       */
      let lienProduit = document.createElement("a");
      document.querySelector(".items").appendChild(lienProduit);
      lienProduit.href = `product.html?id=${produit._id}`;

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
      imgProduit.src = produit.imageUrl;
      imgProduit.alt = produit.altTxt;

      /*
       **Création de l'élément "h3"
       **Import de son nom et ajout de la classe "productName"
       **Dans l'élément "article"
       */
      let nomProduit = document.createElement("h3");
      articleProduit.appendChild(nomProduit);
      nomProduit.classList.add("productName");
      nomProduit.innerHTML = produit.name;

      /*
       **Création de l'élément "p"
       **Import de la description et ajout de la classe "productDescription"
       **Dans l'élément "article"
       */
      let descriptionProduit = document.createElement("p");
      articleProduit.appendChild(descriptionProduit);
      descriptionProduit.classList.add("productDescription");
      descriptionProduit.innerHTML = produit.description;
    });
  } catch (error) {
    alert("Backend indispo")
    return error;
  }
}
