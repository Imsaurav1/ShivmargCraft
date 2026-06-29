/* ============================================
   Mithila Crafts - Shopping Cart
   Client-side cart using localStorage
   ============================================ */

const Cart = {
  STORAGE_KEY: 'mithilacrafts_cart',

  getItems() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  },

  saveItems(items) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.updateBadge();
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { items } }));
  },

  addItem(product, qty = 1) {
    const items = this.getItems();
    const existingIndex = items.findIndex(item => item.id === product.id);

    if (existingIndex >= 0) {
      items[existingIndex].qty += qty;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        qty: qty
      });
    }

    this.saveItems(items);
    this.showToast(`${product.name} added to cart`);
  },

  removeItem(productId) {
    const items = this.getItems().filter(item => item.id !== productId);
    this.saveItems(items);
  },

  updateQty(productId, qty) {
    const items = this.getItems();
    const item = items.find(item => item.id === productId);
    if (item) {
      item.qty = Math.max(1, qty);
      this.saveItems(items);
    }
  },

  clear() {
    this.saveItems([]);
  },

  getTotal() {
    return this.getItems().reduce((sum, item) => sum + item.price * item.qty, 0);
  },

  getCount() {
    return this.getItems().reduce((sum, item) => sum + item.qty, 0);
  },

  updateBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = this.getCount();
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  showToast(message) {
    let toast = document.getElementById('cart-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cart-toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }
};

// Initialize badge on page load
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
});
