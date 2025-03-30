function renderWishlist() {
    const wishlistContainer = document.getElementById('wishlistItems');
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const wishlists = JSON.parse(localStorage.getItem('wishlists')) || {};

    wishlistContainer.innerHTML = ''; // Clear existing content

    if (!loggedInUserId || !wishlists[loggedInUserId] || wishlists[loggedInUserId].length === 0) {
        wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
        return;
    }

    // Get the user's wishlist
    const userWishlist = wishlists[loggedInUserId];

    // Render each item
    userWishlist.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('wishlist-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="wishlist-image">
            <div class="wishlist-details">
                <h3>${item.name}</h3>
                <p>Price: ${item.price} INR</p>
                <button onclick="removeFromWishlist(${index})">Remove</button>
            </div>
        `;
        wishlistContainer.appendChild(itemElement);
    });
}

function removeFromWishlist(index) {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const wishlists = JSON.parse(localStorage.getItem('wishlists')) || {};

    if (!loggedInUserId || !wishlists[loggedInUserId]) {
        return;
    }

    // Remove the item
    wishlists[loggedInUserId].splice(index, 1);

    // Save the updated wishlists to localStorage
    localStorage.setItem('wishlists', JSON.stringify(wishlists));
    renderWishlist();
}

// Load the wishlist on page load
document.addEventListener('DOMContentLoaded', renderWishlist);