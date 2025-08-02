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
    row.classList.add("cart-row");
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

// Update item quantity with bump animation
function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
  triggerBumpEffect(index);
}

// Remove an item
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// Trigger bump animation on a row
function triggerBumpEffect(index) {
  const rows = document.querySelectorAll(".cart-row");
  if (rows[index]) {
    rows[index].classList.add("bump");
    setTimeout(() => rows[index].classList.remove("bump"), 300);
  }
}

// Checkout button click
document.querySelector(".checkout-btn").addEventListener("click", async () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const token = localStorage.getItem("token"); // JWT token from login
  if (!token) {
    alert("Please login to place an order!");
    window.location.href = "login.html";
    return;
  }

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        items: cart,
        totalAmount // required by backend
      })
    });

    const data = await response.json();

    if (response.ok) {
      showSuccessPopup();
      localStorage.removeItem("cart");
      cart = [];
      renderCart();
    } else {
      alert(data.message || "Failed to place order");
    }
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Server error while placing order");
  }
});

// Show success popup
function showSuccessPopup() {
  const popup = document.createElement("div");
  popup.className = "success-popup";
  popup.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <p>Order Placed Successfully!</p>
  `;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("show");
  }, 10);

  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 500);
  }, 2000);
}

// Initial render
renderCart();
