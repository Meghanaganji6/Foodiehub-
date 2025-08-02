document.getElementById('reset-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  const newPassword = document.getElementById('new-password').value.trim();
  const confirmPassword = document.getElementById('confirm-password').value.trim();
  const messageEl = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');

  messageEl.textContent = '';
  messageEl.style.color = '';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Resetting...';

  if (!token) {
    messageEl.textContent = "❌ Invalid or missing reset token.";
    messageEl.style.color = "red";
    submitBtn.disabled = false;
    submitBtn.textContent = 'Reset Password';
    return;
  }

  if (newPassword !== confirmPassword) {
    messageEl.textContent = "❌ Passwords do not match.";
    messageEl.style.color = "red";
    submitBtn.disabled = false;
    submitBtn.textContent = 'Reset Password';
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword })
    });

    const data = await res.json();

    if (res.ok) {
      messageEl.textContent = "✅ Password reset successful! Redirecting...";
      messageEl.style.color = "green";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    } else {
      messageEl.textContent = data.message || "❌ Reset failed.";
      messageEl.style.color = "red";
    }
  } catch (error) {
    console.error("Reset error:", error);
    messageEl.textContent = "❌ Something went wrong. Please try again.";
    messageEl.style.color = "red";
  }

  submitBtn.disabled = false;
  submitBtn.textContent = 'Reset Password';
});
