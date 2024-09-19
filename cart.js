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

        // Function to load cart items from localStorage
        function loadCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartItemsContainer = document.getElementById('cart-items');
            let subtotal = 0;

            // Clear the cart items container
            cartItemsContainer.innerHTML = '';

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item p-4 mb-4 rounded-lg flex justify-between items-center';
                cartItem.innerHTML = `
                    <div>
                        <input type="checkbox" checked class="mr-2">
                        <span class="font-bold">${item.name}</span>
                        <div>${item.quantity} x ₹${item.price} = ₹${itemTotal}</div>
                    </div>
                    <div class="flex items-center">
                        <button class="btn w-8 h-8 rounded-full flex items-center justify-center text-white" onclick="changeQuantity('${item.name}', 1)">+</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn w-8 h-8 rounded-full flex items-center justify-center text-white" onclick="changeQuantity('${item.name}', -1)">-</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });

            // Update subtotal
            document.getElementById('subtotal').innerText = `₹${subtotal.toFixed(2)}`;
        }

        // Function to change quantity of items
        function changeQuantity(itemName, delta) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const item = cart.find(cartItem => cartItem.name === itemName);

            if (item) {
                item.quantity += delta;
                if (item.quantity <= 0) {
                    const index = cart.indexOf(item);
                    cart.splice(index, 1);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCart(); // Refresh the cart display
            }
        }

        // Load cart items on page load
        window.onload = loadCart;
    
