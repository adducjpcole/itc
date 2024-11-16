/**
 * @template {Function} T
 * @param {T} fn
 * @param {number} delay
 * @returns {(...args: Parameters<T>) => void}
 */
function GLOBAL_debounce(fn, delay) {
  /** @type {number} */
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => fn(...args), delay);
  };
}
