// =====================
// 1. Dynamic Navbar with Persistent Login
// =====================
function updateNavbar() {
  const token = localStorage.getItem('authToken');
  const navbar = document.querySelector('.navbar');

  if (token) {
    const user = JSON.parse(token);
    const username = user.username || "User";
    const profilePic = user.profilePic || "default-profile.png";

    navbar.innerHTML = `
      <a href="menu.html">Menu</a>
      <a href="order.html">Order</a>
      <a href="profile.html">
        <img src="https://wallpapers.com/images/hd/best-profile-pictures-dbrcf0ahutxfroi6.jpg" alt="Profile" class="navbar-profile-pic" />
        ${username}
      </a>
      <a href="#" id="logout-btn">Logout</a>
    `;

    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('authToken');
      alert("You’ve been logged out.");
      location.reload(); // Refresh to update navbar
    });

  } else {
    navbar.innerHTML = `
      <a href="login.html">Login</a>
      <a href="signup.html">Signup</a>
      <a href="../admin/adminlogin.html">Admin</a>
    `;
  }
}


// =====================
// 2. Scroll Reveal Effect
// =====================
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  });
}

// =====================
// 3. Order Now Button
// =====================
function handleOrderNow() {
  const orderBtn = document.getElementById('order-now-btn');
  if (orderBtn) {
    orderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const token = localStorage.getItem('authToken');

      if (!token) {
        window.location.href = 'signup.html';
      } else {
        window.location.href = 'menu.html';
      }
    });
  }
}


// =====================
// 4. Display Username if Logged In
// =====================
function displayUsername() {
  const token = localStorage.getItem('authToken');
  const display = document.getElementById('username-display');
  if (!display) return;

  if (token) {
    try {
      // Decode JWT token payload (base64)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const username = payload.username || payload.name || 'User';

      
    } catch (err) {
      display.textContent = '';
    }
  } else {
    display.textContent = '';
  }
}

// =====================
// Initialize Everything Once DOM is Loaded
// =====================
window.addEventListener('DOMContentLoaded', () => {
  updateNavbar();
  revealOnScroll();
  handleOrderNow();
  displayUsername();
});

window.addEventListener('scroll', revealOnScroll);
