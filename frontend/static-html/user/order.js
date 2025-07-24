// Fetch cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Function to render cart items
function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>₹${item.price}</td>
      <td>
        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
        ${item.quantity}
        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
      </td>
      <td>₹${itemTotal}</td>
      <td><button class="remove-btn" onclick="removeItem(${index})"><i class="fas fa-trash"></i></button></td>
    `;
    cartItemsContainer.appendChild(row);
  });

  cartTotal.textContent = total;
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update item quantity
function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

// Remove an item
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// Initial render
renderCart();

// Checkout button
// Checkout button
document.querySelector(".checkout-btn").addEventListener("click", async () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  try {
    const user = localStorage.getItem("userEmail") || "guest"; // Replace with actual user login system
    const items = cart.map(item => `${item.name} x${item.quantity}`);

    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items, user })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Order placed successfully!\n Your order would be ready within 20 minutes\n Thank you for your purchase!");
      localStorage.removeItem("cart");
      cart = [];
      renderCart();
    } else {
      alert("Failed to place order: " + data.error);
    }
  } catch (error) {
    alert("Error placing order.");
    console.error(error);
  }
});
