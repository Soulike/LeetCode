/*
 * @lc app=leetcode id=316 lang=javascript
 *
 * [316] Remove Duplicate Letters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
  /** @type {Map<string, number>} */
  const letterToCount = new Map();

  for (const letter of s) {
    letterToCount.set(letter, (letterToCount.get(letter) ?? 0) + 1);
  }

  /** @type {Set<string>} */
  const inStack = new Set();

  /** @type {string[]} */
  const stack = [];

  /**
   * @param {string} letter
   * @returns {void}
   */
  const pushIntoStack = (letter) => {
    stack.push(letter);
    inStack.add(letter);
  };

  const popFromStack = () => {
    const top = stack.pop();
    inStack.delete(top);
  };

  /**
   * @param {string} letter
   * @returns {void}
   */
  const decreaseLetterToCount = (letter) => {
    letterToCount.set(letter, letterToCount.get(letter) - 1);
    if (letterToCount.get(letter) === 0) {
      letterToCount.delete(letter);
    }
  };

  for (const letter of s) {
    decreaseLetterToCount(letter);
    if (inStack.has(letter)) continue;

    if (stack.length === 0) {
      pushIntoStack(letter);
    } else if (letter > stack[stack.length - 1]) {
      pushIntoStack(letter);
    } else if (letter < stack[stack.length - 1]) {
      if (letterToCount.get(stack[stack.length - 1]) === 0) {
        pushIntoStack(letter);
      } else {
        while (
          stack.length > 0 &&
          (letterToCount.get(stack[stack.length - 1]) ?? 0) > 0 &&
          letter <= stack[stack.length - 1]
        ) {
          popFromStack();
        }
        pushIntoStack(letter);
      }
    }
  }

  return stack.join('');
};
// @lc code=end

removeDuplicateLetters('cbacdcbc');
