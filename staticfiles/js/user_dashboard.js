// Order History
const orderListElement = document.getElementById('order-list');
// Assume 'orders' is an array of order objects fetched from the server
const orders = [
    { id: 1, date: '2023-06-10', total: 25.99 },
    { id: 2, date: '2023-06-15', total: 12.49 },
    { id: 3, date: '2023-06-20', total: 18.75 }

];

orders.forEach(order => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Order ID: ${order.id}</span><span class="date">${order.date}</span><span class="message">Total: $${order.total}</span>`;
    orderListElement.appendChild(listItem);
});

// Notifications
const notificationListElement = document.getElementById('notification-list');
// Assume 'notifications' is an array of notification objects fetched from the server
const notifications = [
    { id: 1, message: 'New order received', date: '2023-06-01' },
    { id: 2, message: 'Special offer: 10% off on desserts', date: '2023-06-05' },
    { id: 3, message: 'Reservation confirmed for tomorrow', date: '2023-06-08' }
];

notifications.forEach(notification => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span class="date">${notification.date}</span><span class="message">${notification.message}</span>`;
    notificationListElement.appendChild(listItem);
});

// Profile