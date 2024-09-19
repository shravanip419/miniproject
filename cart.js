// Get references to HTML elements
const menuItems = document.querySelectorAll('.menu-item');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const paymentPage = document.querySelector('#payment-page');

// Function to add an item to the cart
function addToCart(item) {
  // Create a new cart item element
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
  cartItem.innerHTML = `
    <p>${item.name}</p>
    <p>₹${item.price}</p>
  `;

  // Append the cart item to the cart items container
  cartItems.appendChild(cartItem);

  // Update the cart total
  updateCartTotal();

  // Refresh the payment page
  refreshPaymentPage();
}

// Function to update the cart total
function updateCartTotal() {
  let total = 0;
  const cartItems = document.querySelectorAll('.cart-item');
  cartItems.forEach(item => {
    const price = item.querySelector('p:last-child').textContent.replace('₹', '');
    total += parseFloat(price);
  });
  cartTotal.textContent = '₹${total}';
}

// Function to refresh the payment page
function refreshPaymentPage() {
  // Make an AJAX request to the payment page
  fetch('payment.html')
    .then(response => response.text())
    .then(data => {
      paymentPage.innerHTML = data;
    });
}

// Add click event listeners to menu items
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    const itemName = item.querySelector('h3').textContent;
    const itemPrice = item.querySelector('p').textContent.replace('₹', '');
    addToCart({ name: itemName, price: itemPrice });
  });
});

// Initial cart total update
updateCartTotal();

// Initial payment page refresh
refreshPaymentPage();