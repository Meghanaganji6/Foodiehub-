document.getElementById('next-btn').onclick = function() {
  const email = document.getElementById('email').value.trim();
  if (email) {
    document.getElementById('new-password-section').style.display = 'block';
    this.style.display = 'none';
  }
};

document.getElementById('new-password').oninput = function() {
  if (this.value.trim()) {
    document.getElementById('confirm-password-section').style.display = 'block';
    document.getElementById('reset-btn').style.display = 'inline-block';
  } else {
    document.getElementById('confirm-password-section').style.display = 'none';
    document.getElementById('reset-btn').style.display = 'none';
  }
};

document.getElementById('forgot-form').onsubmit = function(e) {
  e.preventDefault();
  const newPassword = document.getElementById('new-password').value.trim();
  const confirmPassword = document.getElementById('confirm-password').value.trim();

  if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
    alert('Passwords do not match!');
    // Reset all fields and hide sections
    this.reset();
    document.getElementById('new-password-section').style.display = 'none';
    document.getElementById('confirm-password-section').style.display = 'none';
    document.getElementById('reset-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'inline-block';
    return;
  }

  // Add your password reset logic here
  alert('Password reset successful!');
  this.reset();
  document.getElementById('new-password-section').style.display = 'none';
  document.getElementById('confirm-password-section').style.display = 'none';
  document.getElementById('reset-btn').style.display = 'none';
  document.getElementById('next-btn').style.display = 'inline-block';
};