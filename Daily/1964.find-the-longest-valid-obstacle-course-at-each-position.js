/*
 * @lc app=leetcode id=1964 lang=javascript
 *
 * [1964] Find the Longest Valid Obstacle Course at Each Position
 */

// @lc code=start
/**
 * @param {number[]} obstacles
 * @return {number[]}
 */
var longestObstacleCourseAtEachPosition = function (obstacles) {
    const N = obstacles.length;
    /**
     * lis[i] is the height of the shortest ending obstacle for the course of length i + 1
     * @type {number[]}
     */
    const lis = [];
    /** @type {number[]} */
    const ans = new Array(N).fill(0);

    for (let i = 0; i < N; i++) {
        if (lis.length > 0 && obstacles[i] >= lis[lis.length - 1]) {
            lis.push(obstacles[i]);
            ans[i] = lis.length;
        } else {
            // find the upper bound
            let left = 0;
            let right = lis.length;
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (lis[mid] <= obstacles[i]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
            lis[left] = obstacles[i];
            ans[i] = left + 1;
        }
    }
    return ans;
};
// @lc code=end
