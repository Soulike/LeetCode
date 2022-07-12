/*
 * @lc app=leetcode id=169 lang=javascript
 *
 * [169] Majority Element
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    // https://www.zhihu.com/question/49973163
    let element = nums[0];
    let elementCount = 0;

    for (const num of nums) {
        if (element === num) {
            elementCount++;
        } else {
            elementCount--;
            if (elementCount === 0) {
                element = num;
                elementCount = 1;
            }
        }
    }

    return element;
};
// @lc code=end
