//Confirmation des achat avec numero de commande

let str = window.location.href;
let url = new URL(str);
let orderId = url.searchParams.get("orderId");
console.log(orderId);
const idNode = document.getElementById("orderId");
idNode.innerHTML = orderId;
console.log(localStorage.getItem("orderId"));
