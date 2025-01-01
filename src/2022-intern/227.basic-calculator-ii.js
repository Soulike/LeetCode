/*
 * @lc app=leetcode id=227 lang=javascript
 *
 * [227] Basic Calculator II
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  const stack = [];
  let isProcessingDigit = true;

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== ' ') {
      if (isProcessingDigit) {
        if (s[i] === '-') {
          stack.push(0);
          i--;
          isProcessingDigit = false;
        } else {
          const [digit, nextStartIndex] = getNextDigit(s, i);
          isProcessingDigit = false;
          i = nextStartIndex - 1;
          if (stack.length === 0) {
            stack.push(digit);
          } else if (
            stack[stack.length - 1] === '*' ||
            stack[stack.length - 1] === '/'
          ) {
            const [operator, prevDigit] = [stack.pop(), stack.pop()];
            if (operator === '*') {
              stack.push(prevDigit * digit);
            } else {
              stack.push(Math.floor(prevDigit / digit));
            }
          } else {
            stack.push(digit);
          }
        }
      } else {
        stack.push(s[i]);
        isProcessingDigit = true;
      }
    }
  }

  let result = stack[0];
  for (let i = 1; i < stack.length - 1; i += 2) {
    if (stack[i] === '+') {
      result += stack[i + 1];
    } else {
      result -= stack[i + 1];
    }
  }

  return result;
};

function getNextDigit(s, left) {
  let result = 0;
  let nextStartIndex = left + 1;
  for (let i = left; i <= s.length; i++) {
    nextStartIndex = i;
    if (i < s.length && isDigit(s[i])) {
      result *= 10;
      result += Number.parseInt(s[i]);
    } else {
      break;
    }
  }

  return [result, nextStartIndex];
}

function isDigit(c) {
  return (
    c.charCodeAt(0) >= '0'.charCodeAt(0) && c.charCodeAt(0) <= '9'.charCodeAt(0)
  );
}
// @lc code=end
