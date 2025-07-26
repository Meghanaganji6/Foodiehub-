document.getElementById("admin-login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("admin-email").value;
  const password = document.getElementById("admin-password").value;

  fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token && data.user.role === "admin") {
        localStorage.setItem("adminToken", data.token);
        window.location.href = "admin.html";
      } else if (data.token) {
        alert("Access denied: not an admin user.");
      } else {
        alert(data.message || "Login failed");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Something went wrong. Please try again.");
    });
});
