// Assume user email is already stored securely after login
const userEmail = "test@example.com";

fetch(`http://localhost:5000/api/profile?email=${encodeURIComponent(userEmail)}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("username").textContent = data.name;
    document.getElementById("user-email").textContent = data.email;
    // Loop and show past orders if needed
  })
  .catch(err => console.error("Error loading profile:", err));
