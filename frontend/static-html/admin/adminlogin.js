<<<<<<< HEAD
document.getElementById("admin-login-form").addEventListener("submit", async (e) => {
=======
document.getElementById("admin-login-form").addEventListener("submit", function (e) {
>>>>>>> 222382ab02d9d7d325e8f81cdb8b9929f5433e91
  e.preventDefault();

  const email = document.getElementById("admin-email").value;
  const password = document.getElementById("admin-password").value;

<<<<<<< HEAD
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      // Backend returned an error like "Invalid credentials"
      alert(data.message || "Login failed");
      return;
    }

    // ✅ Success: check role before redirect
    if (data.role === "admin") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("profilePic", data.profilePic || "");
      window.location.href = "admin.html"; // or your admin dashboard
    } else {
      alert("Access denied: Not an admin user.");
    }

  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong. See console for details.");
  }
=======
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
>>>>>>> 222382ab02d9d7d325e8f81cdb8b9929f5433e91
});
