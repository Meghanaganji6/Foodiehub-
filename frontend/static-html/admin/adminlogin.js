document.getElementById("admin-login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("admin-email").value;
  const password = document.getElementById("admin-password").value;

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
});
