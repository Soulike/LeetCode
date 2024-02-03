/*
 * @lc app=leetcode id=1043 lang=javascript
 *
 * [1043] Partition Array for Maximum Sum
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var maxSumAfterPartitioning = function (arr, k) {
    /** @type {number[]} */
    const memo = [];

    /**
     * @param {number} start
     * @returns {number}
     */
    const dfs = (start) => {
        if (memo[start] !== undefined) return memo[start];

        let currentMaxElement = 0;
        let currentMaxSum = 0;
        for (let i = 1; i <= k; i++) {
            if (start + i - 1 >= arr.length) break;

            currentMaxElement = Math.max(arr[start + i - 1], currentMaxElement);
            currentMaxSum = Math.max(
                currentMaxSum,
                currentMaxElement * i + dfs(start + i),
            );
        }
        memo[start] = currentMaxSum;
        return currentMaxSum;
    };

    const result = dfs(0);
    return result;
};
// @lc code=end

maxSumAfterPartitioning([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4);
