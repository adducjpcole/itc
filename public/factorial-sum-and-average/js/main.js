'use strict';

window.addEventListener('load', () => {
  const inp = document.querySelector('input');
  if (!inp) throw new Error('Cannot find an input');

  const outFac = /** @type {HTMLInputElement} */ (
    document.querySelector('output[name="fac"]')
  );
  const outSum = /** @type {HTMLInputElement} */ (
    document.querySelector('output[name="sum"]')
  );
  const outAvg = /** @type {HTMLInputElement} */ (
    document.querySelector('output[name="avg"]')
  );

  /**
   * @param {number} num
   */
  function setDisplay(num) {
    outFac.value = calcFactorial(num).toString();

    const sum = calcSum(num);
    outSum.value = sum.toString();

    outAvg.value = num === 0 ? '0' : (sum / num).toString();
  }

  inp.addEventListener('input', () =>
    setDisplay(inp.value.length > 0 ? Number(inp.value) : 0),
  );

  setDisplay(0);
});

/**
 * @param {number} n
 */
function calcFactorial(n) {
  let ans = n;
  while (n > 1 && Number.isFinite(ans)) ans *= --n;

  return ans;
}

/**
 * @param {number} n
 */
function calcSum(n) {
  let sum = 0;
  do {
    sum += n--;
  } while (n > 0);

  return sum;
}
