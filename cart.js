<script>
        function loadCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartItemsContainer = document.getElementById('cart-items');
            let subtotal = 0;
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
                        <button class="bg-[#8b4513] text-white py-1 px-3 rounded-full" onclick="changeQuantity('${item.name}', 1)">+</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="bg-[#8b4513] text-white py-1 px-3 rounded-full" onclick="changeQuantity('${item.name}', -1)">-</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            document.getElementById('cart-total').innerText = `₹${subtotal.toFixed(2)}`;
        }

        function addToCart(name, price) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const item = cart.find(cartItem => cartItem.name === name);
            if (item) {
                item.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }
    
        function changeQuantity(name, delta) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const item = cart.find(cartItem => cartItem.name === name);
            if (item) {
                item.quantity += delta;
                if (item.quantity <= 0) {
                    cart = cart.filter(cartItem => cartItem.name !== name);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCart();
            }
        }

       
            
        window.onload = loadCart();
    </script>