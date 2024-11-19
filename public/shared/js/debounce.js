/**
 * Utility function for "debouncing a function." This that ensures that it
 * doesn’t get called too frequently.
 *
 * @template {Function} T
 * @param {T} fn
 * @param {number} delay
 * @returns {(...args: Parameters<T>) => void}
 */
function SHARED_debounce(fn, delay) {
  /** @type {number} */
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => fn(...args), delay);
  };
}
