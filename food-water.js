let cartItems = []; 

function addToCart(item, event) {
    event.preventDefault(); 
    cartItems.push(item); 
    console.log(cartItems); 
  }

const container = document.getElementById("container");
const pagination = document.querySelector(".pagination");

async function getPage(page = 1) {
  try {
    const response = await fetch("items.json");
    const { pages } = await response.json();
    const currentPageData = pages.find((p) => p.page === page);

    if (!currentPageData) {
      console.error("Page data not found.");
      return;
    }

    container.innerHTML = "";

    currentPageData.data.forEach((item) => {
      container.innerHTML += `
            <div class="user-card card" style="width: 18rem;">
            <img src="${item.image}" class="card-img-top p-3" alt="${
        item.name
      }">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">Quantity: ${item.quantity}</p>
              <p class="card-text">Price: $${item.price}</p>
                <div class="button-container">
                  <a href="#" class="card-button add-to-cart" data-item='${JSON.stringify(
                    item
                  )}'>Add to Cart</a>
                </div>
              </div>
          </div>
            `;
    });
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", (event) => {
        const itemData = JSON.parse(button.getAttribute("data-item"));
        addToCart(itemData, event);
      });
    });
    pagination.innerHTML = "";

    for (let i = 1; i <= pages.length; i++) {
      pagination.innerHTML += `
                <li class="page-item">
                    <button class="page-link" onclick="getPage(${i})">${i}</button>
                </li>
            `;
    }
  } catch (error) {
    console.error("Error fetching the items:", error);
  }
}

getPage();

function addToCart(item, e) {
  e.preventDefault();
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to Cart");
}
