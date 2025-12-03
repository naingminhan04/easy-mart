export function getCartKey(user) {
  return user ? `cart_${user.email || user.sub}` : "cart_guest";
}

export function getCart(user) {
  const key = getCartKey(user);
  return JSON.parse(localStorage.getItem(key) || "[]");
}

export function setCart(user, cart) {
  const key = getCartKey(user);
  localStorage.setItem(key, JSON.stringify(cart));
}

export function clearCart(user) {
  const key = getCartKey(user);
  localStorage.removeItem(key);
}
