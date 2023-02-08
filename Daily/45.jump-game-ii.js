/*
 * @lc app=leetcode id=45 lang=javascript
 *
 * [45] Jump Game II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    const N = nums.length;
    let currentIndex = 0;
    let jumpTime = 0;

    while (currentIndex < N - 1) {
        const maxReachIndex = currentIndex + nums[currentIndex];

        let nextIndexMaxReachIndex = -1;
        let nextIndex = -1;

        jumpTime++;

        for (let i = currentIndex + 1; i <= maxReachIndex; i++) {
            if (i === N - 1) {
                return jumpTime;
            }
            const nextIndexReachIndex = i + nums[i];
            if (nextIndexReachIndex > nextIndexMaxReachIndex) {
                nextIndex = i;
                nextIndexMaxReachIndex = nextIndexReachIndex;
            }
        }

        currentIndex = nextIndex;
    }

    return jumpTime;
};
// @lc code=end
