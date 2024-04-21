/*
 * @lc app=leetcode id=592 lang=javascript
 *
 * [592] Fraction Addition and Subtraction
 */

// @lc code=start
/**
 * @param {string} expression
 * @return {string}
 */
var fractionAddition = function (expression) {
  let stack = [];
  let currentIndex = 0;

  if (expression[0] === '-') {
    stack.push([0, 1]);
    stack.push('-');
    currentIndex = 1;
  }

  let nextOperatorIndex = currentIndex;

  while (true) {
    // 寻找下一个运算符
    while (
      expression[nextOperatorIndex] !== '+' &&
      expression[nextOperatorIndex] !== '-'
    ) {
      nextOperatorIndex++;
      if (nextOperatorIndex === expression.length) {
        break;
      }
    }

    // 解析下一个数字
    const frac = expression
      .slice(currentIndex, nextOperatorIndex)
      .split('/')
      .map((val) => Number.parseInt(val));

    if (stack.length === 0) {
      stack.push(frac);
    } else {
      const topOperator = stack.pop();
      const topFrac = stack.pop();

      if (topOperator === '+') {
        stack.push(addFracs(topFrac, frac));
      } else {
        stack.push(minusFracs(topFrac, frac));
      }
    }

    if (nextOperatorIndex === expression.length) {
      const [numerator, dominator] = stack[0];
      if (dominator < 0) {
        numerator *= -1;
        dominator *= -1;
      }

      return numerator < 0
        ? `-${-1 * numerator}/${dominator}`
        : `${numerator}/${dominator}`;
    } else {
      stack.push(expression[nextOperatorIndex]);
      currentIndex = nextOperatorIndex + 1;
      nextOperatorIndex = currentIndex;
    }
  }
};

function addFracs([b, a], [d, c]) {
  const result = [b * c + a * d, a * c];
  const gcd = getGCD(Math.abs(result[0]), result[1]);
  result[0] /= gcd;
  result[1] /= gcd;
  return result;
}

function minusFracs([b, a], [d, c]) {
  const result = [b * c - a * d, a * c];
  const gcd = getGCD(Math.abs(result[0]), result[1]);
  result[0] /= gcd;
  result[1] /= gcd;
  return result;
}

/**
 * 辗转相除法
 */
function getGCD(a, b) {
  if (a === 0) {
    return b;
  }
  if (b === 0) {
    return a;
  }

  return getGCD(b, a % b);
}
// @lc code=end
