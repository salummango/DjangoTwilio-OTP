const addToCartButtons = document.querySelectorAll(".addtocart-btn");
const cartBtn = document.getElementById("cart");
const itemDetailsContainer = document.getElementById("itemdetails");
const cartTable = document.getElementById("carttable");
const totalPrice = document.getElementById("totalprice");
const closeBtn = document.getElementById("close");
const clearCartBtn = document.getElementById("clearcart");
const notification = document.getElementById("notification");
const cartCount = document.getElementById("cartcount");
const makeOrderBtn = document.getElementById("makeorderbtn")
const totalprice = document.getElementById("totalPrice");

let cartItems = [];
let total = 0;

addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedFoodId = button.getAttribute("data-food-id");

        // Fetching the food data from the API using selectedFoodId
        fetch(`/api/foods/${selectedFoodId}`)
            .then(response => response.json())
            .then(selectedFood => {
                cartItems.push(selectedFood);
                total += selectedFood.price;
                updateCart();
                showNotification("Item added to cart");
            })
            .catch(error => console.error(error));
    });
});


cartBtn.addEventListener("click", () => {
    itemDetailsContainer.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    itemDetailsContainer.style.display = "none";
});

clearCartBtn.addEventListener("click", () => {
    cartItems = [];
    total = 0;
    updateCart();
});

function updateCart() {
    cartCount.innerText = cartItems.length.toString();
    cartTable.innerHTML = `
        <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
        </tr>
    `;

    cartItems.forEach(item => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>${item.description}</td>
            <td>
                <button class="delete-btn" data-food-id="${item.id}">Delete</button>
            </td>
        `;
        cartTable.appendChild(tableRow);
    });

    totalPrice.innerText = `Total: $${total}`;
    totalprice.innerText = `Total: $${total}`;

    if (cartItems.length > 0) {
        itemDetailsContainer.style.display = "block";
    } else {
        itemDetailsContainer.style.display = "none";
    }
}

cartTable.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const foodId = event.target.getAttribute("data-food-id");
        const foodIndex = cartItems.findIndex(item => item.id === foodId);

        if (foodIndex !== -1) {
            const deletedFood = cartItems[foodIndex];
            cartItems.splice(foodIndex, 1);
            total -= deletedFood.price;
            updateCart();
        }
    }
});

function showNotification(message) {
    notification.innerText = message;
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 2000);
}





//card

const cardDetails = document.getElementById("cardDetails");
const mobilePayment = document.getElementById("mobilePayment");
const confirmPaymentBtn = document.getElementById("confirmPaymentBtn");
const closebtn = document.getElementById("closebtn");
const paymentOption = document.querySelector('input[name="paymentOption"]');





closebtn.addEventListener("click", () => {
    itemDetailsContainer.style.display = "none";
});

paymentOption.addEventListener("change", () => {
    if (paymentOption.value === "card") {
        cardDetails.style.display = "block";
        mobilePayment.style.display = "none";
    } else if (paymentOption.value === "mobile") {
        cardDetails.style.display = "none";
        mobilePayment.style.display = "block";
    }
});


confirmPaymentBtn.addEventListener("click", () => {
    const selectedPaymentOption = document.querySelector('input[name="paymentOption"]:checked').value;

    if (selectedPaymentOption === "card") {
        const cardNumber = document.querySelector('input[name="cardNumber"]').value;
        const cardOwnerName = document.querySelector('input[name="cardOwnerName"]').value;
        const cvc = document.querySelector('input[name="cvc"]').value;

        // Perform card payment process using the card details
        // Save payment details to the database

    } else if (selectedPaymentOption === "mobile") {
        const selectedMobileVendor = document.querySelector('input[name="mobileVendor"]:checked').value;

        // Generate control number for mobile payment and display it
        // Save payment details to the database

    }
});