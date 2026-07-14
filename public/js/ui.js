// Módulo de Interfaz de Usuario (UI) y Animaciones

/**
 * Muestra una notificación temporal en pantalla (Toast).
 * @param {string} message - El mensaje a mostrar.
 * @param {string} type - El tipo de alerta ('success' | 'error').
 */
export function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const iconName = type === 'success' ? 'check-circle' : 'alert-circle';
  toast.innerHTML = `
    <span class="toast-icon"><i data-lucide="${iconName}"></i></span>
    <span class="toast-text">${message}</span>
  `;

  container.appendChild(toast);
  
  // Renderizar ícono de Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Animación de entrada
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Auto eliminar después de 3.5 segundos
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3500);
}

/**
 * Inicializa efectos de scroll del encabezado
 */
export function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Inicializa el menú de navegación móvil
 */
export function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuBtn || !nav) return;

  // Toggle Menú
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    
    // Cambiar ícono de menú (hamburguesa a X)
    const icon = menuBtn.querySelector('i');
    if (icon) {
      const isOpen = nav.classList.contains('open');
      icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
      if (window.lucide) window.lucide.createIcons();
    }
  });

  // Cerrar menú al hacer clic en un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', 'menu');
        if (window.lucide) window.lucide.createIcons();
      }
    });
  });
}

/**
 * Inicializa el comportamiento de navegación activa por secciones al hacer scroll
 */
export function initActiveNavigationLinks() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Compensación de 100px para el header
      if (window.scrollY >= (sectionTop - 120)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Inicializa los eventos de envío de formularios
 */
export function initFormHandlers() {
  const appointmentForm = document.getElementById('appointment-form');
  const newsletterForm = document.getElementById('newsletter-form');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const petOwner = document.getElementById('pet-owner').value;
      const petName = document.getElementById('pet-name').value;
      const date = document.getElementById('app-date').value;
      
      // Simular guardado de cita
      showToast(`¡Cita registrada con éxito para ${petName}! Te esperamos el ${date}. Propietario: ${petOwner}`, 'success');
      appointmentForm.reset();
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input');
      
      showToast(`¡Gracias por suscribirte con ${emailInput.value}! Te mantendremos informado.`, 'success');
      newsletterForm.reset();
    });
  }
}
