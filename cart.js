const loggedInUserId = localStorage.getItem('loggedInUserId');
function renderCart() {
    if (!loggedInUserId) {
        alert('Please log in to view your cart.');
        return;
    }

    const userCartKey = `cart_${loggedInUserId}`;
    const cart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    const cartItemsContainer = document.getElementById("cartItems");
    const itemCountElement = document.getElementById("itemCount");
    const cartTotalElement = document.getElementById("cartTotal");

    cartItemsContainer.innerHTML = ""; // Clear previous content
    let totalItems = 0;
    let totalCost = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="4">Your cart is empty.</td></tr>';
    } else {
        cart.forEach((item, index) => {
            totalItems += item.quantity;
            totalCost += item.price * item.quantity;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <img src="${item.image}" alt="${item.name}">
                    <span>${item.name}</span>
                </td>
                <td>
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </td>
                <td>${item.price} INR</td>
                <td>${(item.price * item.quantity).toFixed(2)} INR</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });
    }

    itemCountElement.textContent = totalItems;
    cartTotalElement.textContent = totalCost.toFixed(2);
}

document.addEventListener("DOMContentLoaded", renderCart);
function updateQuantity(index, change) {
    // const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (!loggedInUserId) {
        alert('Please log in to update your cart.');
        return;
    }

    const userCartKey = `cart_${loggedInUserId}`;
    const cart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        cart.splice(index, 1); // Remove item if quantity becomes 0
    }

    localStorage.setItem(userCartKey, JSON.stringify(cart));
    renderCart();
}

// Remove an item from the cart
function removeFromCart(index) {
    // const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (!loggedInUserId) {
        alert('Please log in to remove items from your cart.');
        return;
    }

    const userCartKey = `cart_${loggedInUserId}`;
    const cart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    cart.splice(index, 1); // Remove the selected item
    localStorage.setItem(userCartKey, JSON.stringify(cart));
    renderCart();
}