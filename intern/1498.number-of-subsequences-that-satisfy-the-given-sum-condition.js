/*
 * @lc app=leetcode id=1498 lang=javascript
 *
 * [1498] Number of Subsequences That Satisfy the Given Sum Condition
 */

// @lc code=start
const MOD = 10 ** 9 + 7;

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var numSubseq = function (nums, target) {
    nums.sort((a, b) => a - b);
    let count = 0;

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        if (nums[left] + nums[right] > target) {
            right--;
        } else {
            // 对于 nums[left+1:right]，有多少种子序列，前面加上 nums[left] 就是所有子序列
            // 不会发生重复，因为 left 不会被重复取到
            count += mod2Pow(right - left);
            count %= MOD;
            left++;
        }
    }

    return count;
};

const cache = new Map();
function mod2Pow(exp) {
    if (exp === 0) {
        return 1;
    }

    if (cache.has(exp)) {
        return cache.get(exp);
    }
    const result = (mod2Pow(exp - 1) * 2) % MOD;
    cache.set(exp, result);
    return result;
}
// @lc code=end
