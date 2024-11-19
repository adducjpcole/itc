'use strict';

SHARED_onReady(() => {
  const form = document.getElementsByTagName('form')[0];
  form.addEventListener('submit', (ev) => ev.preventDefault());

  function setView() {
    form['number'].value = parseFloat(form['number'].value);

    form['number-output'].value = getNumberOutput(
      form['formula'].value.replace('%d', form['number'].value),
    );
    form['formula-output'].value = getFormulaOutput(
      form['formula'].value,
      form['number'].value,
    );
  }

  form['formula'].addEventListener('change', setView);
  form['number'].addEventListener('input', setView);
  setView();
});

/**
 * @param {string} infixExpr
 * @returns
 */
function getNumberOutput(infixExpr) {
  return parseFloat(
    GLOBAL_BinaryTree.evaluate(GLOBAL_BinaryTree.fromInfix(infixExpr)).toFixed(
      4,
    ),
  );
}

/**
 * @param {string} formula
 * @param {string} number
 */
function getFormulaOutput(formula, number) {
  return formula.replace('%d', number).replace('( ', '(').replace(' )', ')');
}
