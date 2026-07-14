// Módulo Principal (Punto de Entrada)
import { renderProducts } from './products.js';
import { addToCart, updateCartUI, clearCart } from './cart.js';
import { 
  initHeaderScroll, 
  initMobileMenu, 
  initActiveNavigationLinks, 
  initFormHandlers, 
  showToast 
} from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar Íconos
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Inicializar comportamientos de UI y scroll
  initHeaderScroll();
  initMobileMenu();
  initActiveNavigationLinks();
  initFormHandlers();

  // 3. Inicializar carrito (Estado vacío)
  updateCartUI();

  // 4. Renderizar productos en la boutique (Inicio/Productos)
  // Pasamos 'addToCart' como callback para que el botón de cada producto agregue al carro
  renderProducts('products-grid', 'all', (product) => {
    addToCart(product);
  });

  // 5. Configurar filtros de categorías de productos
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remover clase active de todos los botones de filtro
      filterButtons.forEach(b => b.classList.remove('active'));
      // Agregar active al botón presionado
      e.target.classList.add('active');
      
      const category = e.target.getAttribute('data-category');
      
      // Volver a renderizar
      renderProducts('products-grid', category, (product) => {
        addToCart(product);
      });
    });
  });

  // 6. Configurar drawer (Panel deslizante) del carrito
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');

  if (cartToggleBtn && cartDrawer) {
    cartToggleBtn.addEventListener('click', () => {
      cartDrawer.classList.add('open');
    });
  }

  if (cartCloseBtn && cartDrawer) {
    cartCloseBtn.addEventListener('click', () => {
      cartDrawer.classList.remove('open');
    });
  }

  if (cartOverlay && cartDrawer) {
    cartOverlay.addEventListener('click', () => {
      cartDrawer.classList.remove('open');
    });
  }

  // 7. Configurar Checkout (Finalizar Compra)
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      // Simulación de pasarela de pago exitosa
      showToast('🐾 ¡Procesando pago...!', 'success');
      
      setTimeout(() => {
        showToast('🎉 ¡Compra realizada con éxito! Recibirás los detalles en tu correo.', 'success');
        clearCart();
        
        // Cerrar carrito
        if (cartDrawer) {
          cartDrawer.classList.remove('open');
        }
      }, 1500);
    });
  }
});
