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
    const stack = [];
    for (const c of s) {
        if (stack.length === 0) {
            stack.push([c, 1]);
        } else {
            const [topC, len] = stack[stack.length - 1];
            if (topC !== c) {
                stack.push([c, 1]);
            } else {
                if (len === k - 1) {
                    stack.length -= k - 1;
                } else {
                    stack.push([c, len + 1]);
                }
            }
        }
    }

    return stack.map(([c]) => c).join('');
};
// @lc code=end
