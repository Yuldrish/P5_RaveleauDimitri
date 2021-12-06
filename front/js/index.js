// Recuperer tout les products du backend a travers la route /products
const url = "http://localhost:3000/api/products";
fetch(url).then(function (response) {
  console.log("response", response);
  response.json().then(function (data) {
    console.log("data", data);
    for (let i = 0; i < data.length; i++) {
      const product = data[i];
      document.getElementById("items").innerHTML += `
        <a href="./product.html?id=42">
          <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
          </article>
        </a>
      `;
    }
  });
});

// A l'aide du js selectionner la section ayant pour id "items"
