// Cookie-based cart utility
const CART_COOKIE_NAME = 'ts_cart';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function readCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.split('; ').find(row => row.startsWith(name + '='));
  if (!match) return null;
  return decodeURIComponent(match.split('=')[1] || '');
}

function writeCookie(name, value) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}`;
}

function dispatchCartUpdated() {
  if (typeof window === 'undefined') return;
  const ev = new CustomEvent('cart-updated', { detail: { count: getCartCount() } });
  window.dispatchEvent(ev);
}

export function getCart() {
  try {
    const raw = readCookie(CART_COOKIE_NAME);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function setCart(cart) {
  try {
    writeCookie(CART_COOKIE_NAME, JSON.stringify(cart || []));
    dispatchCartUpdated();
  } catch (e) {
    // noop
  }
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.qty || 0), 0);
}

export function addToCart(product, qty = 1) {
  if (!product || !product._id && !product.id) return getCartCount();
  const id = product._id || product.id;
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === id);
  if (idx === -1) {
    cart.push({ id, qty });
  } else {
    cart[idx].qty = (cart[idx].qty || 0) + qty;
  }
  setCart(cart);
  return getCartCount();
}

export function removeFromCart(productId, qty = 0) {
  if (!productId) return getCartCount();
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === productId);
  if (idx === -1) return getCartCount();
  if (qty <= 0) {
    cart.splice(idx, 1);
  } else {
    cart[idx].qty = Math.max(0, (cart[idx].qty || 0) - qty);
    if (cart[idx].qty === 0) cart.splice(idx, 1);
  }
  setCart(cart);
  return getCartCount();
}

export function clearCart() {
  setCart([]);
  return 0;
}
