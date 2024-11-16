'use strict';

/**
 * @typedef {Object} BoundProperty
 * @property {() => string | null} get
 * @property {(value: string) => void} set
 * @property {() => HTMLElement} element
 */

/**
 * @type {Object.<string, BoundProperty>}
 */
const BOUND_VALUE = {};
/**
 * @type {Object.<string, BoundProperty>}
 */
const BOUND_TEXT = {};

document.addEventListener('readystatechange', () => {
  if (document.readyState !== 'complete') return;

  /** @type {NodeListOf<HTMLElement>} */
  const boundElements = document.querySelectorAll('[data-bind-js-name]');
  for (const element of boundElements) {
    if (
      element.dataset.bindValue !== undefined &&
      element instanceof HTMLInputElement
    ) {
      BOUND_VALUE[/** @type {string} */ (element.dataset.bindJsName)] = {
        get: () => {
          return element.value;
        },
        set: (value) => {
          element.value = value;
        },
        element: () => {
          return element;
        },
      };
    }

    if (element.dataset.bindText !== undefined) {
      BOUND_TEXT[/** @type {string} */ (element.dataset.bindJsName)] = {
        get: () => {
          return element.innerText;
        },
        set: (value) => {
          element.innerText = value;
        },
        element: () => {
          return element;
        },
      };
    }
  }
});
