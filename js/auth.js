/* ============================================
   Mithila Crafts - Authentication Client
   Handles login, register, token management
   ============================================ */

const Auth = {
  TOKEN_KEY: 'mithilacrafts_token',
  USER_KEY: 'mithilacrafts_user',

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem(this.USER_KEY));
    } catch {
      return null;
    }
  },

  isLoggedIn() {
    return !!this.getToken();
  },

  isAdmin() {
    const user = this.getUser();
    return user && user.role === 'admin';
  },

  saveAuth(token, user) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.updateNavbar();
    this.syncCartToServer();
  },

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.updateNavbar();
    window.location.href = 'index.html';
  },

  async register(name, email, password, phone) {
    const res = await fetch('/.netlify/functions/auth-register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    this.saveAuth(data.token, data.user);
    return data;
  },

  async login(email, password) {
    const res = await fetch('/.netlify/functions/auth-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    this.saveAuth(data.token, data.user);
    return data;
  },

  async getProfile() {
    const res = await fetch('/.netlify/functions/auth-profile', {
      headers: { 'Authorization': `Bearer ${this.getToken()}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch profile');
    return data.user;
  },

  async updateProfile(updates) {
    const res = await fetch('/.netlify/functions/auth-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update profile');
    if (data.user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(data.user));
      this.updateNavbar();
    }
    return data.user;
  },

  authHeaders() {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
  },

  async syncCartToServer() {
    if (!this.isLoggedIn()) return;
    try {
      const items = Cart.getItems();
      if (items.length > 0) {
        await fetch('/.netlify/functions/cart-api', {
          method: 'POST',
          headers: this.authHeaders(),
          body: JSON.stringify({ items }),
        });
      }
    } catch (err) {
      console.error('Cart sync error:', err);
    }
  },

  async loadCartFromServer() {
    if (!this.isLoggedIn()) return;
    try {
      const res = await fetch('/.netlify/functions/cart-api', {
        headers: this.authHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          const localItems = Cart.getItems();
          // Merge server cart with local cart
          const merged = [...data.items];
          for (const local of localItems) {
            if (!merged.find(m => m.id === local.id)) {
              merged.push(local);
            }
          }
          Cart.saveItems(merged);
        }
      }
    } catch (err) {
      console.error('Cart load error:', err);
    }
  },

  updateNavbar() {
    const authLinks = document.querySelectorAll('.auth-nav-links');
    authLinks.forEach(container => {
      if (this.isLoggedIn()) {
        const user = this.getUser();
        let adminLink = '';
        if (user && user.role === 'admin') {
          adminLink = '<a href="admin.html" class="nav-admin-link">Admin</a>';
        }
        container.innerHTML = `
          ${adminLink}
          <a href="dashboard.html" class="nav-user-link" title="${user ? user.name : 'Account'}">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span class="nav-user-name">${user ? user.name.split(' ')[0] : 'Account'}</span>
          </a>
        `;
      } else {
        container.innerHTML = `
          <a href="login.html" class="btn btn-sm btn-outline">Login</a>
        `;
      }
    });
  },
};

// Update navbar auth state on page load
document.addEventListener('DOMContentLoaded', () => {
  Auth.updateNavbar();
});
