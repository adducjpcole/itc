/* eslint-disable no-unused-vars */ ///PS-DELETE
'use strict'; ///PS-DELETE

const BinaryTree = (() => {
  /**
   * @param {string} optr
   * @returns {1 | 2 | 3 | 0}
   */
  function getPrecedence(optr) {
    if (optr === '+' || optr === '-') return 1;

    if (optr === '*' || optr === '/') return 2;

    if (optr === '^') return 3;

    return 0;
  }

  /**
   * @param {string} optr
   * @returns {"r-l" | "l-r"}
   */
  function getAssociativity(optr) {
    if (optr === '^') return 'r-l';

    return 'l-r';
  }

  class TreeNode {
    /** @type {string} */
    value = '';
    /** @type {null|TreeNode} */
    left = null;
    /** @type {null|TreeNode} */
    right = null;

    /**
     * @param {string} value
     */
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  /**
   * Inspired by the Shunting-yard algorithm!
   *
   * @param {string} infixExpr
   * @returns {TreeNode} Returns the head/root of the tree.
   */
  function fromInfix(infixExpr) {
    const optrStack = [];
    const exprStack = [];

    const pushExprStack = () => {
      const node = new TreeNode(optrStack.pop());
      node.right = exprStack.pop();
      node.left = exprStack.pop();
      exprStack.push(node);
    };

    // Operands CANNOT have children.
    // Operators CAN have children.
    const tokens = infixExpr.split(/\s+/);
    for (const token of tokens) {
      if (token.match(/[a-zA-Z0-9]/)) {
        // Operand
        exprStack.push(new TreeNode(token));
      } else if (token === '(') {
        optrStack.push(token);
      } else if (token === ')') {
        while (
          optrStack.length > 0 &&
          optrStack[optrStack.length - 1] !== '('
        ) {
          pushExprStack();
        }

        optrStack.pop();
      } else {
        // Operator
        const tokenPrecedence = getPrecedence(token);

        while (
          optrStack.length > 0 &&
          getPrecedence(optrStack[optrStack.length - 1]) > tokenPrecedence
        ) {
          pushExprStack();
        }

        if (getAssociativity(token) === 'l-r') {
          while (
            optrStack.length > 0 &&
            getPrecedence(optrStack[optrStack.length - 1]) === tokenPrecedence
          ) {
            pushExprStack();
          }
        }

        optrStack.push(token);
      }
    }

    while (optrStack.length > 0) {
      const node = new TreeNode(optrStack.pop());
      node.right = exprStack.pop();
      node.left = exprStack.pop();
      exprStack.push(node);
    }

    return exprStack[exprStack.length - 1];
  }

  /**
   * @param {TreeNode} [node]
   * @returns {number}
   */
  function evaluate(node) {
    // Operand
    if (node.value.match(/[a-zA-Z0-9]/)) return Number(node.value);

    // Operator
    switch (node.value) {
      case '+':
        return evaluate(node.left) + evaluate(node.right);
      case '-':
        return evaluate(node.left) - evaluate(node.right);
      case '*':
        return evaluate(node.left) * evaluate(node.right);
      case '/':
        return evaluate(node.left) / evaluate(node.right);
      case '^':
        // NOTE: I haven't tested this one, actually. I'm just hoping it works as intended.
        return Math.pow(evaluate(node.left), evaluate(node.right));
    }

    throw new Error(`Unrecognized operator during evaluation: "${node.value}"`);
  }

  return {
    fromInfix,
    evaluate,
  };
})();
