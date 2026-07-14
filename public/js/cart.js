// Módulo de Carrito de Compras
import { showToast } from './ui.js';

let cart = [];

/**
 * Retorna la lista de elementos en el carrito.
 * @returns {Array}
 */
export function getCart() {
  return cart;
}

/**
 * Agrega un producto al carrito o incrementa su cantidad.
 * @param {Object} product - El producto a agregar.
 */
export function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  
  updateCartUI();
  showToast(`¡Se agregó "${product.name}" al carrito!`, 'success');
}

/**
 * Elimina un producto por completo del carrito.
 * @param {string} productId - ID del producto.
 */
export function removeFromCart(productId) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  cart = cart.filter(i => i.id !== productId);
  updateCartUI();
  showToast(`Se eliminó "${item.name}" del carrito.`, 'error');
}

/**
 * Actualiza la cantidad de un artículo.
 * @param {string} productId - ID del producto.
 * @param {number} amount - Cantidad a sumar (ej. +1, -1).
 */
export function updateQty(productId, amount) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += amount;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    updateCartUI();
  }
}

/**
 * Calcula la cantidad total de artículos.
 * @returns {number}
 */
export function getCartCount() {
  return cart.reduce((count, item) => count + item.qty, 0);
}

/**
 * Calcula el costo total de los productos.
 * @returns {number}
 */
export function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.qty), 0);
}

/**
 * Limpia todo el carrito.
 */
export function clearCart() {
  cart = [];
  updateCartUI();
}

/**
 * Actualiza la interfaz del carrito (Contador, Lista y Totales) en el DOM.
 */
export function updateCartUI() {
  const badge = document.getElementById('cart-badge');
  const itemsContainer = document.getElementById('cart-items-container');
  const subtotalLabel = document.getElementById('cart-subtotal');
  const totalLabel = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  const count = getCartCount();
  const total = getCartTotal();

  // Actualizar indicador del botón de carrito
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  // Actualizar textos de precios
  if (subtotalLabel) subtotalLabel.textContent = `$${total.toFixed(2)}`;
  if (totalLabel) totalLabel.textContent = `$${total.toFixed(2)}`;

  // Habilitar o deshabilitar botón de finalizar compra
  if (checkoutBtn) {
    checkoutBtn.disabled = count === 0;
  }

  // Renderizar elementos del carrito en el panel
  if (!itemsContainer) return;

  if (count === 0) {
    itemsContainer.innerHTML = `
      <div class="empty-cart-message">
        <i data-lucide="shopping-basket" class="empty-cart-icon"></i>
        <p>Tu carrito está vacío</p>
        <button id="btn-start-shopping" class="btn btn-secondary btn-sm">Empezar a comprar</button>
      </div>
    `;
    
    // Evento para cerrar el carrito al presionar el botón "Empezar a comprar"
    const startShoppingBtn = itemsContainer.querySelector('#btn-start-shopping');
    if (startShoppingBtn) {
      startShoppingBtn.addEventListener('click', () => {
        const drawer = document.getElementById('cart-drawer');
        if (drawer) drawer.classList.remove('open');
      });
    }
  } else {
    itemsContainer.innerHTML = '';
    
    cart.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
          <div class="cart-item-qty">
            <button class="qty-btn minus-btn" data-id="${item.id}"><i data-lucide="minus"></i></button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn plus-btn" data-id="${item.id}"><i data-lucide="plus"></i></button>
          </div>
          <button class="remove-item-btn" data-id="${item.id}">
            <i data-lucide="trash-2"></i> Eliminar
          </button>
        </div>
      `;

      // Eventos locales del elemento de carrito
      itemEl.querySelector('.minus-btn').addEventListener('click', () => updateQty(item.id, -1));
      itemEl.querySelector('.plus-btn').addEventListener('click', () => updateQty(item.id, 1));
      itemEl.querySelector('.remove-item-btn').addEventListener('click', () => removeFromCart(item.id));

      itemsContainer.appendChild(itemEl);
    });
  }

  // Refrescar iconos de Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
