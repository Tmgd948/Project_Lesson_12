const totalProducts = document.getElementById("TotalProducts");
const totalPrice = document.getElementById("TotalPrice");
const approveButton = document.getElementById("Approve");

let selectedProducts = JSON.parse(localStorage.getItem("cart"));
if (!Array.isArray(selectedProducts)) {
    selectedProducts = [];
}

let currentUser = localStorage.getItem("currentUser");

let totalAmount = 0;
selectedProducts.forEach(item => {
    totalAmount += item.price;
});

totalProducts.textContent = "Total products: " + selectedProducts.length;
totalPrice.textContent = "Total price: " + totalAmount;

approveButton.addEventListener("click", approvePurchase);

function approvePurchase(event) {
    event.preventDefault();

    axios.post("http://localhost:3000/buy", { user: localStorage.getItem("currentUser"), products: selectedProducts })

        .then(response => {
            if (response.data === "OK") {
                alert("Purchase successful");
                localStorage.removeItem("cart");
                localStorage.removeItem("currentUser");
                window.location.href = "/Entry-Page.html";
            } else {
                alert("Error");
            }
        })
        .catch(() => {
            console.log(error)
        });
}
