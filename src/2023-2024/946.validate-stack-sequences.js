/*
 * @lc app=leetcode id=946 lang=javascript
 *
 * [946] Validate Stack Sequences
 */

// @lc code=start
/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function (pushed, popped) {
  /** @type {number[]} */
  const stack = [];
  let poppedIndex = 0;

  for (const num of pushed) {
    stack.push(num);

    while (
      stack.length > 0 &&
      poppedIndex < popped.length &&
      stack.at(-1) === popped[poppedIndex]
    ) {
      poppedIndex++;
      stack.pop();
    }
  }

  return stack.length === 0 && poppedIndex === popped.length;
};
// @lc code=end

validateStackSequences([0], [0]);
