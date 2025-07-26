const cartButtons = document.querySelectorAll(".add-cart-btn");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add item to cart
function addToCart(itemName, price, button) {
  const existingItem = cart.find(item => item.name === itemName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: itemName, price: price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  showToast(`${itemName} added to cart!`);

  button.classList.add("added");
  setTimeout(() => button.classList.remove("added"), 400);
}

// Update cart count
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountElement) cartCountElement.textContent = totalItems;
}
updateCartCount();

// Fly-to-cart animation
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

  setTimeout(() => imgClone.remove(), 800);
}

// Button clicks
cartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const foodCard = button.closest(".food-card");
    const itemName = foodCard.querySelector("h3").textContent;
    const price = parseInt(foodCard.querySelector(".price").textContent.replace("₹", ""));
    const imgElement = foodCard.querySelector("img");

    addToCart(itemName, price, button);
    flyToCart(imgElement);
  });
});

// =====================
// Search + Filter + Veg
// =====================
const searchBar = document.getElementById("search-bar");
const filterButtons = document.querySelectorAll(".filter-buttons button");
const vegToggle = document.getElementById("veg-mode");

function applySearchAndFilter() {
  const searchTerm = searchBar.value.toLowerCase();
  const activeCategory = document.querySelector(".filter-buttons button.active").dataset.category;
  const vegOnly = vegToggle.checked;

  document.querySelectorAll(".food-card").forEach(card => {
    const itemName = card.querySelector("h3").textContent.toLowerCase();
    const categoryMatch = activeCategory === "all" || card.dataset.category === activeCategory;
    const nameMatch = itemName.includes(searchTerm);
    const vegMatch = !vegOnly || card.dataset.veg === "true";

    if (nameMatch && categoryMatch && vegMatch) {
      card.classList.remove("hide");
      card.style.display = ""; // Keep grid layout intact
      setTimeout(() => card.style.opacity = "1", 10);
    } else {
      card.style.opacity = "0";
      setTimeout(() => card.classList.add("hide"), 300);
    }
  });
}

searchBar.addEventListener("input", applySearchAndFilter);
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    applySearchAndFilter();
  });
});
vegToggle.addEventListener("change", applySearchAndFilter);

// =====================
// Quick View Modal
// =====================
const modal = document.getElementById("quick-view-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalFoodImg = document.getElementById("modal-food-img");
const modalFoodName = document.getElementById("modal-food-name");
const modalFoodPrice = document.getElementById("modal-food-price");
const modalAddCartBtn = document.getElementById("modal-add-cart-btn");

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

// Close modal
closeModalBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// =====================
// Toast Notification
// =====================
function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}
