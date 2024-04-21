/*
 * @lc app=leetcode id=43 lang=javascript
 *
 * [43] Multiply Strings
 */

// @lc code=start
const ZERO_CHAR_CODE = 48;

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
const multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') {
    return '0';
  }
  if (num1 === '1') {
    return num2;
  }
  if (num2 === '1') {
    return num1;
  }

  let short = num1;
  let long = num2;
  if (num1.length > num2.length) {
    short = num2;
    long = num1;
  }
  const shortLength = short.length;
  let oneBitMultiplyResult = '0';
  for (let i = shortLength - 1; i >= 0; i--) {
    oneBitMultiplyResult = add(
      oneBitMultiplyResult,
      multiplyOneBitNumAndNBitNum(short.charAt(i), long).concat(
        '0'.repeat(shortLength - i - 1),
      ),
    );
  }
  return oneBitMultiplyResult;
};

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function add(num1, num2) {
  /**@type {string[]} */
  const result = [];
  let num1LastCharCode = 0;
  let num2LastCharCode = 0;
  let charCodeSum = 0;
  const num1Split = num1.split('');
  const num2Split = num2.split('');
  let hasCarry = false;
  while (num1Split.length !== 0 && num2Split.length !== 0) {
    // @ts-ignore
    num1LastCharCode = num1Split.pop().charCodeAt(0);
    // @ts-ignore
    num2LastCharCode = num2Split.pop().charCodeAt(0);
    charCodeSum = num1LastCharCode + num2LastCharCode - 2 * ZERO_CHAR_CODE;
    if (hasCarry) {
      ++charCodeSum;
    }
    result.push(String.fromCharCode((charCodeSum % 10) + ZERO_CHAR_CODE));
    hasCarry = charCodeSum >= 10;
  }

  while (num1Split.length !== 0) {
    if (hasCarry) {
      // @ts-ignore
      num1LastCharCode = num1Split.pop().charCodeAt(0);
      charCodeSum = num1LastCharCode - ZERO_CHAR_CODE;
      if (hasCarry) {
        ++charCodeSum;
      }
      result.push(String.fromCharCode((charCodeSum % 10) + ZERO_CHAR_CODE));
      hasCarry = charCodeSum >= 10;
    } else {
      // @ts-ignore
      result.push(num1Split.pop());
    }
  }

  while (num2Split.length !== 0) {
    if (hasCarry) {
      // @ts-ignore
      num2LastCharCode = num2Split.pop().charCodeAt(0);
      charCodeSum = num2LastCharCode - ZERO_CHAR_CODE;
      if (hasCarry) {
        ++charCodeSum;
      }
      result.push(String.fromCharCode((charCodeSum % 10) + ZERO_CHAR_CODE));
      hasCarry = charCodeSum >= 10;
    } else {
      // @ts-ignore
      result.push(num2Split.pop());
    }
  }

  if (hasCarry) {
    result.push('1');
  }

  return result.reverse().join('');
}

/**
 * @description 计算 1 位乘 n 位数的结果
 * @param {string} oneBitNum 1 位数
 * @param {string} nBitNum n 位数
 * @return {string}
 */
function multiplyOneBitNumAndNBitNum(oneBitNum, nBitNum) {
  if (oneBitNum.length !== 1) {
    throw new Error();
  }
  let carry = 0;
  /**@type {string[]} */
  const result = [];
  const nBitNumLength = nBitNum.length;
  const oneBitNumCharCodeConverted = oneBitNum.charCodeAt(0) - ZERO_CHAR_CODE;
  let nBitNumCharCodeConverted = 0;
  let multiplyResult = 0;
  for (let i = nBitNumLength - 1; i >= 0; i--) {
    nBitNumCharCodeConverted = nBitNum.charCodeAt(i) - ZERO_CHAR_CODE;
    multiplyResult =
      nBitNumCharCodeConverted * oneBitNumCharCodeConverted + carry;
    result.push(String.fromCharCode(ZERO_CHAR_CODE + (multiplyResult % 10)));
    carry = Math.floor(multiplyResult / 10);
  }
  if (carry !== 0) {
    result.push(carry.toString());
  }
  return result.reverse().join('');
}
// @lc code=end

console.log(multiply('103', '98'));
