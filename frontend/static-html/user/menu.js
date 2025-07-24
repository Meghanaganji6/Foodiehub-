// --- Dynamic Menu Rendering from Backend ---
document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:5000/api/admin/dishes')
    .then(res => res.json())
    .then(dishes => {
      const grid = document.getElementById('menu-grid');
      grid.innerHTML = '';
      dishes.forEach(dish => {
        if (!dish.available) return; // Only show available items
        const card = document.createElement('div');
        card.className = 'food-card';
        card.setAttribute('data-category', dish.category.toLowerCase());
        card.setAttribute('data-veg', dish.veg ? 'true' : 'false');
        card.innerHTML = `
          <div class="food-img">
            <img src="${dish.imageUrl}" alt="${dish.name}">
          </div>
          <div class="food-info">
            <h3>${dish.name}</h3>
            <p class="price">₹${dish.price}</p>
            <button class="add-cart-btn">Add to Cart</button>
          </div>
        `;
        grid.appendChild(card);
      });

      // Re-initialize all events after rendering
      initializeMenuEvents();
    });
});

// --- Helper to re-initialize all events after rendering ---
function initializeMenuEvents() {
  // Cart button events
  document.querySelectorAll(".add-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const foodCard = button.closest(".food-card");
      const itemName = foodCard.querySelector("h3").textContent;
      const price = parseInt(foodCard.querySelector(".price").textContent.replace("₹", ""));
      const imgElement = foodCard.querySelector("img");

      addToCart(itemName, price, button);
      flyToCart(imgElement);
    });
  });

  // Quick View Modal events
  document.querySelectorAll(".food-img img").forEach(img => {
    img.addEventListener("click", () => {
      const foodCard = img.closest(".food-card");
      const itemName = foodCard.querySelector("h3").textContent;
      const price = foodCard.querySelector(".price").textContent;
      const imageUrl = img.src;

      modalFoodImg.src = imageUrl;
      modalFoodName.textContent = itemName;
      modalFoodPrice.textContent = price;

      modal.style.display = "flex";

      modalAddCartBtn.onclick = () => {
        const priceValue = parseInt(price.replace("₹", ""));
        addToCart(itemName, priceValue, modalAddCartBtn);
        flyToCart(modalFoodImg);
      };
    });
  });

  // Search functionality
  const searchBar = document.getElementById("search-bar");
  if (searchBar) {
    searchBar.addEventListener("input", () => {
      const searchTerm = searchBar.value.toLowerCase();
      document.querySelectorAll(".food-card").forEach(card => {
        const itemName = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = itemName.includes(searchTerm) ? "block" : "none";
      });
    });
  }

  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const category = button.dataset.category;

      document.querySelectorAll(".food-card").forEach(card => {
        if (category === "all" || card.dataset.category === category) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });

  // Veg Mode
  const vegMode = document.getElementById('veg-mode');
  if (vegMode) {
    vegMode.addEventListener('change', function() {
      const showVegOnly = this.checked;
      document.querySelectorAll('.food-card').forEach(card => {
        if (showVegOnly) {
          if (card.getAttribute('data-veg') !== 'true') {
            card.classList.add('hide');
          } else {
            card.classList.remove('hide');
          }
        } else {
          card.classList.remove('hide');
        }
      });
    });
  }
}

// --- Cart Logic ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(itemName, price, button) {
  const existingItem = cart.find(item => item.name === itemName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: itemName, price: price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  // Show toast notification
  showToast(`${itemName} added to cart!`);

  // Animate button
  button.classList.add("added");
  setTimeout(() => button.classList.remove("added"), 400);
}

function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}
updateCartCount();

// --- Fly-to-cart animation ---
function flyToCart(imgElement) {
  const cartIcon = document.querySelector(".cart-link i");
  const imgClone = imgElement.cloneNode(true);
  imgClone.classList.add("fly-img");

  const imgRect = imgElement.getBoundingClientRect();
  imgClone.style.top = imgRect.top + "px";
  imgClone.style.left = imgRect.left + "px";
  imgClone.style.width = imgElement.offsetWidth + "px";
  imgClone.style.height = imgElement.offsetHeight + "px";

  document.body.appendChild(imgClone);

  const cartRect = cartIcon.getBoundingClientRect();
  const translateX = cartRect.left - imgRect.left;
  const translateY = cartRect.top - imgRect.top;

  setTimeout(() => {
    imgClone.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.1)`;
    imgClone.style.opacity = "0";
  }, 50);

  setTimeout(() => {
    imgClone.remove();
  }, 800);
}

// --- Quick View Modal Logic ---
const modal = document.getElementById("quick-view-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalFoodImg = document.getElementById("modal-food-img");
const modalFoodName = document.getElementById("modal-food-name");
const modalFoodPrice = document.getElementById("modal-food-price");
const modalAddCartBtn = document.getElementById("modal-add-cart-btn");

if (closeModalBtn && modal) {
  closeModalBtn.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}

// --- Toast Notification ---
function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000); // Toast lasts 3 seconds
}

