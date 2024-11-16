'use strict';

window.addEventListener('load', () => {
  displayIncomeTax();

  BOUND_VALUE['in_income'].element().addEventListener('input', () => {
    displayIncomeTax();
  });
});

function displayIncomeTax() {
  BOUND_TEXT['out_income'].set(
    getIncomeTax(Number(BOUND_VALUE['in_income'].get())).toLocaleString(
      'en-PH',
      { style: 'currency', currency: 'PHP' },
    ),
  );
}

/**
 * Calculates the income tax (basic tax + rate) based on the taxable income.
 *
 * @param {number} taxableIncome
 */
function getIncomeTax(taxableIncome) {
  if (taxableIncome > 8_000_000) {
    return 2_410_000 + (taxableIncome - 8_000_000) * 0.35;
  } else if (taxableIncome > 2_000_000) {
    return 490_000 + (taxableIncome - 2_000_000) * 0.32;
  } else if (taxableIncome > 800_000) {
    return 130_000 + (taxableIncome - 800_000) * 0.3;
  } else if (taxableIncome > 400_000) {
    return 30_000 + (taxableIncome - 400_000) * 0.25;
  } else if (taxableIncome > 250_000) {
    return (taxableIncome - 250_000) * 0.2;
  } else {
    return 0;
  }
}
