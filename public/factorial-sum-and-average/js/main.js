'use strict';

window.addEventListener('load', () => {
  const inp = document.querySelector('input');
  const out_fac = /** @type {HTMLOutputElement|null} */ (
    document.querySelector('output[name="fac"]')
  );

  const out_sum = /** @type {HTMLOutputElement|null} */ (
    document.querySelector('output[name="sum"]')
  );
  const out_avg = /** @type {HTMLOutputElement|null} */ (
    document.querySelector('output[name="avg"]')
  );

  if (!inp || !out_fac || !out_sum || !out_avg)
    throw new Error('Something went wrong');

  const setDisplay = () => {
    const n = inp.value.length > 0 ? Number(inp.value) : 0;

    out_fac.value = calcFactorial(n).toString();

    const sum = calcSum(n);
    out_sum.value = sum.toString();

    out_avg.value = calcAvg(n).toString();
  };
  setDisplay();

  inp.addEventListener('input', setDisplay);
});

/**
 * @param {number} n
 */
function calcFactorial(n) {
  let ans = n;
  while (n > 1 && Number.isFinite(ans)) {
    ans *= --n;
  }

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

/**
 * @param {number} n
 */
function calcAvg(n) {
  if (n === 0) return 0;

  let sum = n;
  for (let i = 1; i < n; i++) {
    sum += i;
  }

  return sum / n;
}
