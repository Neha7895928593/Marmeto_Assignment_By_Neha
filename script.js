console.log('====================================');
console.log("Connected");
console.log('====================================');

const apiUrl = "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889";


async function fetchCartData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    renderCartItems(data.items);
    renderCartTotals(data.original_total_price, data.currency);
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
}

// featch Cart Items
function renderCartItems(items) {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; 

  items.forEach(item => {
    const itemRow = document.createElement("tr");
    itemRow.innerHTML = `
      <td>
        <div class="product">
          <img src="${item.image}" alt="${item.title}">
          <span>${item.title}</span>
        </div>
      </td>
      <td>Rs. ${(item.price / 100).toFixed(2)}</td>
      <td><input type="number" value="${item.quantity}" min="1"></td>
      <td>Rs. ${(item.line_price / 100).toFixed(2)}</td>
      <td><i class="fas fa-trash"></i></td>
    `;
    cartItemsContainer.appendChild(itemRow);
  });
}


function renderCartTotals(totalPrice, currency) {
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");

  subtotalElement.textContent = `${currency} ${(totalPrice / 100).toFixed(2)}`;
  totalElement.textContent = `${currency} ${(totalPrice / 100).toFixed(2)}`;
}


fetchCartData();
