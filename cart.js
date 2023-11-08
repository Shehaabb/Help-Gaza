let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(item, e) {
    e.preventDefault();
    cartItems.push(item);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    alert('Added to Cart');
    renderCartItems();
}

function renderCartItems() {
    const allItems = document.querySelector(".items");
    allItems.innerHTML = '';
    let totalPrice = 0;

    if (cartItems.length === 0) {
        allItems.innerHTML = '<h1 style="text-align:center;">Your cart is empty</h1>';
        return;
    }
    cartItems.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        allItems.innerHTML +=  `
            <div class="item">
                <div class="left">
                    <div class="image">
                        <img src="${item.image}" alt="Item Image">
                    </div>
                    <div class="item-name"><h2>${item.name}</h2></div>
                    <div class="quantity"><h2>Quantity: ${item.quantity}</h2></div>
                    <div class="price"><p>Price: $${item.price * item.quantity}</p></div>
                </div>
                <div class="right">
                    <div class="buttons">
                        <span class="minus" onclick="decrement(${index})">-</span>
                        <span class="counter">${item.quantity}</span>
                        <span class="plus" onclick="increment(${index})">+</span>
                    </div>
                    <div class="x" onclick="removeFromCart(${index})">
                        <img src="./images/delete.png" alt="Delete">
                    </div>
                </div>
        `;
        
    });
    allItems.innerHTML += `
    <div class="total-price">
        <h2>Total Price: $${totalPrice.toFixed(2)}</h2>
    </div>
    <div class="checkout">
        <a href="checkout.html">Checkout</a>
    </div>
    `;
}

function increment(index) {
    cartItems[index].quantity++;
    updateCart();
}

function decrement(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        updateCart();
    }
}

function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    let totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    localStorage.setItem("totalPrice", totalPrice.toFixed(2));
    renderCartItems();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

document.addEventListener('DOMContentLoaded', renderCartItems);
