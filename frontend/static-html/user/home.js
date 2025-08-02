document.getElementById('order-now-btn').addEventListener('click', function(e) {
  e.preventDefault();
  if (localStorage.getItem('loggedIn') === 'true') {
    window.location.href = 'user/menu.html';
  } else {
    alert('Please login first.');
  }
});