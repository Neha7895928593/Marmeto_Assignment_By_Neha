const apiUrl = "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889";


let cartData = {};


async function fetchCartData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    cartData = data; 
    renderCartItems();
    renderCartTotals();
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
}


function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; 

  cartData.items.forEach((item) => {
    const itemRow = document.createElement("tr");
    itemRow.innerHTML = `
      <td>
        <div class="product">
          <img src="${item.image}" alt="${item.title}">
          <span>${item.title}</span>
        </div>
      </td>
      <td>Rs. ${item.price.toFixed(2)}</td>
      <td><input type="number" value="${item.quantity}" min="1" class="item-quantity" data-item-id="${item.id}"></td>
      <td>Rs. ${(item.price * item.quantity).toFixed(2)}</td>
      <td><i class="fas fa-trash delete-item" data-item-id="${item.id}"></i></td>
    `;
    cartItemsContainer.appendChild(itemRow);
  });

  attachEventListeners();
}


function attachEventListeners() {
  document.querySelectorAll(".item-quantity").forEach((input) => {
    input.addEventListener("change", handleQuantityChange);
  });

  document.querySelectorAll(".delete-item").forEach((icon) => {
    icon.addEventListener("click", handleItemRemoval);
  });
}


function handleQuantityChange(event) {
  const itemId = event.target.dataset.itemId;
  const newQuantity = parseInt(event.target.value, 10);

  if (newQuantity < 1 || isNaN(newQuantity)) {
    alert("Quantity must be 1 or more.");
    event.target.value = 1; 
    return;
  }

  const item = cartData.items.find((item) => item.id == itemId);
  if (item) {
    item.quantity = newQuantity; 
  }

  renderCartItems();
  renderCartTotals();
}


function handleItemRemoval(event) {
  const itemId = event.target.dataset.itemId;

  cartData.items = cartData.items.filter((item) => item.id != itemId);

  renderCartItems();
  renderCartTotals();
}


function renderCartTotals() {
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");

  const subtotal = cartData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  subtotalElement.textContent = `${cartData.currency} ${subtotal.toFixed(2)}`;
  totalElement.textContent = `${cartData.currency} ${subtotal.toFixed(2)}`;
}


fetchCartData();
