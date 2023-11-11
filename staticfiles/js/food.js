// // ****** CART IN A FORM OF TABLE

// const addToCartButtons = document.querySelectorAll("#addtocart");
// const cartButton = document.getElementById("cart");
// const cartCount = document.getElementById("cartcount");
// const itemDetailsContainer = document.getElementById("itemdetails");
// const cartTable = document.getElementById("carttable");
// const totalPrice = document.getElementById("totalprice");
// const closeBtn = document.getElementById("close");
// const clearCartBtn = document.getElementById("clearcart");
// const notification = document.getElementById("notification");

// let itemCount = 0;
// let cartItems = [];
// let total = 0;

// addToCartButtons.forEach(button => {
//     button.addEventListener("click", () => {
//         const productId = button.getAttribute("data-product-id");
//         const selectedProduct = products.find(product => product.id === productId);

//         if (selectedProduct) {
//             cartItems.push(selectedProduct);
//             itemCount++;
//             total += selectedProduct.price;
//             cartCount.innerText = itemCount;
//             notification.innerText = "Item added to cart";
//             notification.style.display = "block";

//             // Set a timeout to hide the notification after 2 seconds
//             setTimeout(() => {
//                 notification.style.display = "none";
//             }, 2000);
//         }
//     });
// });

// cartButton.addEventListener("click", () => {
//     if (cartItems.length > 0) {
//         cartTable.innerHTML = `
//             <tr>
//                 <th>Product Name</th>
//                 <th>Price</th>
//                 <th>Description</th>
//                 <th>Action</th>
//             </tr>
//         `;

//         cartItems.forEach(item => {
//             const tableRow = document.createElement("tr");
//             tableRow.innerHTML = `
//                 <td>${item.name}</td>
//                 <td>$${item.price}</td>
//                 <td>${item.description}</td>
//                 <td>
//                     <button class="delete-btn" data-product-id="${item.id}">Delete</button>
//                 </td>
//             `;
//             cartTable.appendChild(tableRow);
//         });

//         totalPrice.innerText = `Total:$${total}`;

//         itemDetailsContainer.style.display = "block";
//     }
// });

// cartTable.addEventListener("click", (event) => {
//     if (event.target.classList.contains("delete-btn")) {
//         const productId = event.target.getAttribute("data-product-id");
//         const itemIndex = cartItems.findIndex(item => item.id === productId);

//         if (itemIndex !== -1) {
//             const deletedItem = cartItems[itemIndex];
//             cartItems.splice(itemIndex, 1);
//             itemCount--;
//             total -= deletedItem.price;
//             cartCount.innerText = itemCount;
//             totalPrice.innerText = `$${total}`;
//             event.target.parentElement.parentElement.remove();
//         }
//     }
// });

// clearCartBtn.addEventListener("click", () => {
//     cartItems = [];
//     itemCount = 0;
//     total = 0;
//     cartCount.innerText = itemCount;
//     totalPrice.innerText = `$${total}`;
//     cartTable.innerHTML = "";
// });

// closeBtn.addEventListener("click", () => {
//     itemDetailsContainer.style.display = "none";
// }); 


const addToCartButtons = document.querySelectorAll(".addtocart-btn");
const itemDetailsContainer = document.getElementById("itemdetails");
const cartTable = document.getElementById("carttable");
const totalPrice = document.getElementById("totalprice");
const closeBtn = document.getElementById("close");
const clearCartBtn = document.getElementById("clearcart");
const notification = document.getElementById("notification");
const foodsDataElement = document.getElementById("foods-data");
const foodsData = JSON.parse(foodsDataElement.dataset.foods);

let cartItems = [];
let total = 0;

addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedFoodId = button.getAttribute("data-food-id");
        const selectedFood = foodsData.foods.find(food => food.id === selectedFoodId);

        if (selectedFood) {
            cartItems.push(selectedFood);
            total += selectedFood.price;
            updateCart();
            showNotification("Item added to cart");
        }
    });
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

    if (cartItems.length > 0) {
        itemDetailsContainer.style.display = "block";
    } else {
        itemDetailsContainer.style.display = "none";
    }
}

cartTable.addEventListener("click", event => {
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