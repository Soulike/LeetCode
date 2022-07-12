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
    /**
     * 从 pushed[0] 开始入栈
     * 每次入栈和出栈，检查 popped[0]
     *  如果符合，出栈 popped.shift()
     *  如果不符合，继续入栈
     *  如果不符合且 pushed 已经用完，返回 false
     */

    /** @type {number[]} */
    const stack = [];

    let poppedIndex = 0;

    for (let i = 0; i < pushed.length; i++) {
        stack.push(pushed[i]);

        while (
            stack.length > 0 &&
            stack[stack.length - 1] === popped[poppedIndex]
        ) {
            poppedIndex++;
            stack.pop();
        }
    }

    return stack.length === 0;
};
// @lc code=end
