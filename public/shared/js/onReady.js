const GLOBAL_onReady = (() => {
  /**
   * Utility function to call the `callback()` when the DOM content is loaded
   * or already loaded.
   *
   * @param {() => void} callback
   */
  return (callback) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => callback());
    } else {
      callback();
    }
  };
})();
