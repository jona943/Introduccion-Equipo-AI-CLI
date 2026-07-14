// Módulo de Productos

export const products = [
  {
    id: 'prod-1',
    name: 'Alimento Orgánico de Res & Granos Ancestrales',
    category: 'alimento',
    price: 34.99,
    tag: 'Más Vendido',
    image: 'images/dog_food.jpg',
    desc: 'Nutrición premium para perros adultos con ingredientes 100% orgánicos.'
  },
  {
    id: 'prod-2',
    name: 'Champú Orgánico Herbal & Cepillo Premium',
    category: 'cuidado',
    price: 18.50,
    tag: 'Ecológico',
    image: 'images/shampoo.jpg',
    desc: 'Fórmula suave de lavanda y cedro para un pelaje sedoso, incluye cepillo de cerdas naturales.'
  },
  {
    id: 'prod-3',
    name: 'Juguete Interactivo SmartPaw con Sensor AI',
    category: 'tecnologia',
    price: 49.99,
    tag: 'Tecnología',
    image: 'images/pet_toy.jpg',
    desc: 'Estimulación física y mental con movimiento inteligente, luces LED suaves y recargable.'
  }
];

/**
 * Renderiza los productos en el contenedor especificado.
 * @param {string} containerId - ID del elemento contenedor.
 * @param {string} activeCategory - Categoría por la cual filtrar ('all', 'alimento', etc.)
 * @param {Function} onAddToCartCallback - Función que se ejecuta al presionar agregar al carrito.
 */
export function renderProducts(containerId, activeCategory = 'all', onAddToCartCallback) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  if (filteredProducts.length === 0) {
    container.innerHTML = '<p class="no-products">No hay productos disponibles en este momento.</p>';
    return;
  }

  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-container">
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
      </div>
      <div class="product-details">
        <span class="product-cat">${getCategoryLabel(product.category)}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price-row">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          <button class="add-to-cart-btn" data-id="${product.id}" aria-label="Agregar al carrito">
            <i data-lucide="plus"></i>
          </button>
        </div>
      </div>
    `;

    // Asignar evento al botón de agregar
    const addBtn = card.querySelector('.add-to-cart-btn');
    addBtn.addEventListener('click', () => {
      onAddToCartCallback(product);
    });

    container.appendChild(card);
  });

  // Re-iniciar íconos de Lucide para los elementos recién creados
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function getCategoryLabel(category) {
  switch (category) {
    case 'alimento': return 'Nutrición';
    case 'cuidado': return 'Higiene & Cuidado';
    case 'tecnologia': return 'Tecnología';
    default: return 'Boutique';
  }
}
