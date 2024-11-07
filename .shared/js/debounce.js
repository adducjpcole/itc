/* eslint-disable no-unused-vars */

/**
 * @template {Function} T
 * @param {T} fn
 * @param {number} delay
 * @returns {T}
 */
function debounce(fn, delay) {
  let timeout;
  // @ts-ignore
  return (...args) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => fn(...args), delay);
  };
}
