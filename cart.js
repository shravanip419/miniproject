// Cart.js
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.querySelector('.cart-total');
const paymentPageElement = document.querySelector('#payment-page');

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
  cartItemsContainer.appendChild(cartItem);

  // Update the cart total
  updateCartTotal();

  // Refresh the payment page
  refreshPaymentPage();
}

// Function to update the cart total
function updateCartTotal() {
  let total = 0;
  const cartItems = cartItemsContainer.querySelectorAll('.cart-item');
  cartItems.forEach(item => {
    const price = item.querySelector('p:last-child').textContent.replace('₹', '');
    total += parseFloat(price);
  });
  cartTotalElement.textContent = '₹${total}';
}

// Function to refresh the payment page
function refreshPaymentPage() {
  // Make an AJAX request to the payment page
  fetch('payment.html')
    .then(response => response.text())
    .then(data => {
      paymentPageElement.innerHTML = data;
    });
}

// Add event listeners to the "ADD+" buttons
document.querySelectorAll('.add-button').forEach(button => {
  button.addEventListener('click', () => {
    const itemName = button.parentNode.querySelector('h3').textContent;
    const itemPrice = button.parentNode.querySelector('p').textContent.replace('₹', '');
    addToCart({ name: itemName, price: itemPrice });
  });
});

// Initial cart total update
updateCartTotal();

// Initial payment page refresh
refreshPaymentPage();