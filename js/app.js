/* ============================================
   Mithila Crafts - Main Application Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollEffects();
});

/* ---------- Navbar ---------- */
function initNavbar() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // Mark active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ---------- Scroll Effects ---------- */
function initScrollEffects() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }
}

/* ---------- Product Rendering Helpers ---------- */
function renderProductCard(product) {
  const imageDataURI = getProductImageDataURI(product.image, 400, 320);
  const badgeHTML = product.badge
    ? `<span class="product-badge">${product.badge}</span>`
    : '';
  const originalPriceHTML = product.originalPrice
    ? `<span class="original-price">&#8377;${product.originalPrice.toLocaleString('en-IN')}</span>`
    : '';

  return `
    <div class="product-card" data-id="${product.id}" data-category="${product.category}">
      <div class="product-image">
        <a href="product-detail.html?id=${product.id}">
          <img src="${imageDataURI}" alt="${product.name}" loading="lazy">
        </a>
        ${badgeHTML}
      </div>
      <div class="product-info">
        <span class="product-category">${product.category.replace('-', ' ')}</span>
        <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
        <p>${product.description}</p>
        <div class="product-footer">
          <span class="product-price">&#8377;${product.price.toLocaleString('en-IN')}${originalPriceHTML}</span>
          <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}

function renderProductsGrid(products, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = '<p style="text-align:center; grid-column: 1/-1; padding: 40px; color: var(--color-text-light);">No products found matching your criteria.</p>';
    return;
  }

  container.innerHTML = products.map(renderProductCard).join('');

  // Attach add-to-cart handlers
  container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = parseInt(btn.dataset.id);
      const product = PRODUCTS.find(p => p.id === productId);
      if (product) Cart.addItem(product);
    });
  });
}

/* ---------- Format Currency ---------- */
function formatPrice(price) {
  return `\u20B9${price.toLocaleString('en-IN')}`;
}
