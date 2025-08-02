// const signupForm = document.getElementById("signupForm");
//     const signupMessage = document.getElementById("signupMessage");

//     signupForm.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       const name = document.getElementById("name").value;
//       const email = document.getElementById("email").value;
//       const password = document.getElementById("password").value;

//       try {
//         const response = await fetch("http://localhost:5000/api/auth/register", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ name, email, password }),
//         });

//         const data = await response.json();
//         if (response.ok) {
//           signupMessage.style.color = "green";
//           signupMessage.textContent = "Signup successful! Redirecting...";
//           setTimeout(() => window.location.href = "login.html", 2000);
//         } else {
//           signupMessage.style.color = "red";
//           signupMessage.textContent = data.message || "Signup failed";
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         signupMessage.textContent = "Server error. Try again later.";
//       }

//       // login.js or signup.js
// document.addEventListener("DOMContentLoaded", () => {
//   const loginForm = document.querySelector("form");

//   loginForm.addEventListener("submit", function(e) {
//     e.preventDefault();

//     // Simulate successful login
//     localStorage.setItem("isLoggedIn", "true");

//     // Redirect to home page
//     window.location.href = "home.html"; // or home.html
//   });
// });

//     });
 
