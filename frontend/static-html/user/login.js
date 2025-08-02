document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token with optional username and profilePic
        const authToken = {
          token: data.token,
          username: data.username || "User", // fallback if not returned
          profilePic: data.profilePic || ""  // fallback if not returned
        };
        localStorage.setItem("authToken", JSON.stringify(authToken));

        // Redirect to home
        window.location.href = "home.html";
      } else {
        alert(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});
