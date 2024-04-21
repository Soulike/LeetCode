/*
 * @lc app=leetcode id=28 lang=javascript
 *
 * [28] Implement strStr()
 */

// @lc code=start
const RADIX = 26;
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  if (needle === '') return 0;
  if (haystack.length < needle.length) return -1;

  const windowSize = needle.length;

  const MOD = 1658598167;
  let MINUS_HEAD_MOD = 1;
  for (let i = 0; i < windowSize - 1; i++) {
    MINUS_HEAD_MOD = (MINUS_HEAD_MOD * RADIX) % MOD;
  }

  /**
   * Remove the hightest bit
   * @param {number} num
   * @param {number} headNum
   * @returns {number}
   */
  function minusHead(num, headNum) {
    return (num - ((headNum * MINUS_HEAD_MOD) % MOD) + MOD) % MOD;
  }

  /**
   * Add to the lowest bit
   * @param {number} num
   * @param {number} tailNum
   * @returns {number}
   */
  function addTail(num, tailNum) {
    return (((num * RADIX) % MOD) + tailNum) % MOD;
  }

  let needleHash = 0;
  for (let i = 0; i < needle.length; i++) {
    needleHash = addTail(needleHash, getCharNum(needle[i]));
  }

  let left = 0;
  let right = windowSize;

  let windowHash = 0;

  for (let i = 0; i < windowSize; i++) {
    windowHash = addTail(windowHash, getCharNum(haystack[i]));
  }

  if (windowHash === needleHash && rangeEqual(haystack, left, needle)) {
    return left;
  }

  while (right < haystack.length) {
    windowHash = minusHead(windowHash, getCharNum(haystack[left]));
    windowHash = addTail(windowHash, getCharNum(haystack[right]));

    left++;
    right++;

    if (windowHash === needleHash && rangeEqual(haystack, left, needle)) {
      return left;
    }
  }

  return -1;
};

/**
 * @param {string} letter
 * @returns {number}
 */
function getCharNum(letter) {
  return letter.charCodeAt(0) - 'a'.charCodeAt(0);
}

/**
 * @param {string} haystack
 * @param {number} start
 * @param {string} needle
 */
function rangeEqual(haystack, start, needle) {
  for (let i = 0; i < needle.length; i++) {
    if (haystack[i + start] !== needle[i]) {
      return false;
    }
  }
  return true;
}

// @lc code=end

strStr('hello', 'll');
