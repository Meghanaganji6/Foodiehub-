// --- Load Menu Items ---
function loadMenuItems() {
  fetch('http://localhost:5000/api/admin/dishes')
    .then(res => res.json())
    .then(dishes => {
      const tbody = document.getElementById('menu-items-list');
      tbody.innerHTML = '';
      dishes.forEach(dish => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${dish.name}</td>
          <td>${dish.category}</td>
          <td>₹${dish.price}</td>
          <td>${dish.veg ? 'Veg' : 'Non-Veg'}</td>
          <td><span class="status ${dish.available ? 'available' : 'unavailable'}">${dish.available ? 'Available' : 'Unavailable'}</span></td>
          <td>
            <button class="disable-btn" data-id="${dish._id}">${dish.available ? 'Disable' : 'Enable'}</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    });
}

// --- Add New Dish ---
document.getElementById('add-dish-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const [name, category, price, vegSelect, imgUrl] = Array.from(this.elements).map(el => el.value);
  if (!name || !category || !price || !vegSelect || !imgUrl) return;

  fetch('http://localhost:5000/api/admin/dishes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      category,
      price,
      veg: vegSelect === "veg",
      imageUrl: imgUrl
    })
  })
  .then(res => res.json())
  .then(() => {
    this.reset();
    loadMenuItems();
  });
});

// --- Disable/Enable Menu Item ---
document.getElementById('menu-items-list').addEventListener('click', function(e) {
  if (e.target.classList.contains('disable-btn')) {
    const id = e.target.getAttribute('data-id');
    const available = e.target.textContent === 'Disable' ? false : true;
    fetch(`http://localhost:5000/api/admin/dishes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ available })
    })
    .then(res => res.json())
    .then(() => loadMenuItems());
  }
});

// --- Load Orders ---
function loadOrders() {
  fetch('http://localhost:5000/api/admin/orders')
    .then(res => res.json())
    .then(orders => {
      const tbody = document.getElementById('orders-list');
      tbody.innerHTML = '';
      orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>#${order._id.slice(-4)}</td>
          <td><ul>${order.items.map(item => `<li>${item}</li>`).join('')}</ul></td>
          <td>${order.user}</td>
          <td>${new Date(order.createdAt).toLocaleString()}</td>
          <td><span class="status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
          <td>
            ${order.status === 'preparing' ? `<button class="mark-done-btn" data-id="${order._id}">Mark as Done</button> `: ''}
          </td>
        `;
        tbody.appendChild(row);
      });
      updateOrderStats(orders);
    });
}


// --- Mark Order as Done ---
document.getElementById('orders-list').addEventListener('click', function(e) {
  if (e.target.classList.contains('mark-done-btn')) {
    const id = e.target.getAttribute('data-id');
    fetch(`http://localhost:5000/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'done' })
    })
    .then(res => res.json())
    .then(() => loadOrders());
  }
});


// --- Update Order Stats ---
function updateOrderStats(orders) {
  const total = orders.length;
  const preparing = orders.filter(order => order.status === 'preparing').length;
  const done = orders.filter(order => order.status === 'done').length;

  const totalElem = document.getElementById('total-orders');
  const preparingElem = document.getElementById('preparing-orders');
  const doneElem = document.getElementById('done-orders');

  if (totalElem) totalElem.textContent = total;
  if (preparingElem) preparingElem.textContent = preparing;
  if (doneElem) doneElem.textContent = done;
}




// --- Initial load ---
loadMenuItems();
loadOrders();

