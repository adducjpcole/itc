'use strict';

window.addEventListener('load', () => {
  const form = document.getElementsByTagName('form')[0];

  function setNumberView() {
    form['number'].value = parseFloat(form['number'].value);

    const expr = form['formula'].value.replace('%d', form['number'].value);
    const binaryTreeHead = GLOBAL_BinaryTree.fromInfix(expr);

    form['number-output'].value = parseFloat(
      GLOBAL_BinaryTree.evaluate(binaryTreeHead).toFixed(4),
    );
  }

  function setFormulaView() {
    form['formula-output'].children[1].innerText = form['formula'].value
      .replace('%d', form['number'].value)
      .replace('( ', '(')
      .replace(' )', ')');
  }

  function setView() {
    setNumberView();
    setFormulaView();
  }

  form.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') ev.preventDefault();
  });
  form['formula'].addEventListener('change', setView);
  form['number'].addEventListener('keydown', setView);

  // For initialization of the view.
  setView();
});
