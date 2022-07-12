/*
 * @lc app=leetcode id=1306 lang=javascript
 *
 * [1306] Jump Game III
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
const canReach = function (arr, start) {
    const n = arr.length;
    const cache = new Map();
    const visited = new Set();
    /**
     * 从 start 开始，能否到达有 0 的位置
     */
    function helper(start) {
        if (cache.has(start)) {
            return cache.get(start);
        }
        // 转一圈回来了
        if (visited.has(start)) {
            return false;
        }

        visited.add(start);
        let result;
        if (start >= n || start < 0) {
            result = false;
        } else if (arr[start] === 0) {
            result = true;
        } else {
            result = helper(start + arr[start]) || helper(start - arr[start]);
        }
        cache.set(start, result);
        return result;
    }

    return helper(start);
};
// @lc code=end
