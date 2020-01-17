function sum(a, b) {
  /* ваш код */
  const z = a + b;
  if (typeof z === 'number') {
    return z;
  }
  throw new TypeError('Не число(');
}

module.exports = sum;
