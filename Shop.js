const itemsContainer = document.getElementById("Items");
const sortButton = document.getElementById("Sort");
const buyButton = document.getElementById("Buy");
const sortOptions = document.getElementById("Options");

let savedCart = localStorage.getItem("cart");
let selectedProducts;
if (savedCart) {
    selectedProducts = JSON.parse(savedCart);
} else {
    selectedProducts = [];
}


let products = [];

axios.get("http://localhost:3000/products")
    .then(response => {
        products = response.data;
        displayProducts(products);
    })
    .catch(() => {
        console.log(error);
    });


function displayProducts(products) {
    itemsContainer.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        const productDiv = document.createElement("div");
        productDiv.textContent = products[i].name + " " + products[i].price;
        productDiv.addEventListener("click", () => addToCart(products[i]));
        itemsContainer.appendChild(productDiv);
    }
}


function addToCart(product) {
    selectedProducts.push(product);
    localStorage.setItem("cart", JSON.stringify(selectedProducts));
    alert(product.name + " added to cart...");
}


sortButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (sortOptions.value === "By Name") {
        products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOptions.value === "By Price") {
        products.sort((a, b) => a.price - b.price);
    }
    displayProducts(products);
});


buyButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (selectedProducts.length === 0) {
        alert("No products selected.");
        return;
    }
    localStorage.setItem("cart", JSON.stringify(selectedProducts));
    window.location.href = "/Buy.html";
});

