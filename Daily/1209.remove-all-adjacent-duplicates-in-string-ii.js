/*
 * @lc app=leetcode id=1209 lang=javascript
 *
 * [1209] Remove All Adjacent Duplicates in String II
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var removeDuplicates = function (s, k) {
    /** @type {string[]} */
    const stack = [];
    /** @type {number[]} */
    const topDuplicateCountStack = [];

    for (const c of s) {
        if (stack.length === 0) {
            stack.push(c);
            topDuplicateCountStack.push(1);
        } else {
            if (stack.at(-1) !== c) {
                stack.push(c);
                topDuplicateCountStack.push(1);
            } else {
                const topDuplicateCount = topDuplicateCountStack.at(-1) ?? 0;
                if (topDuplicateCount === k - 1) {
                    stack.length -= topDuplicateCount;
                    topDuplicateCountStack.pop();
                } else {
                    stack.push(c);
                    topDuplicateCountStack[topDuplicateCountStack.length - 1] =
                        topDuplicateCount + 1;
                }
            }
        }
    }

    return stack.join('');
};
// @lc code=end
