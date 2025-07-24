// --- Star Rating Interactivity ---
document.querySelectorAll('.rating').forEach(ratingDiv => {
  const stars = ratingDiv.querySelectorAll('i');
  stars.forEach((star, idx) => {
    star.addEventListener('click', () => {
      stars.forEach((s, i) => {
        s.classList.toggle('fas', i <= idx);
        s.classList.toggle('far', i > idx);
      });
    });
  });
});
