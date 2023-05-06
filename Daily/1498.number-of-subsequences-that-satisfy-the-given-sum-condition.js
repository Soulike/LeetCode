/*
 * @lc app=leetcode id=1498 lang=javascript
 *
 * [1498] Number of Subsequences That Satisfy the Given Sum Condition
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var numSubseq = function (nums, target) {
    const MOD = 10 ** 9 + 7;

    /** @type {number[]} */
    const powMemo = [];

    /**
     * @param {number} exp
     * @returns {number}
     */
    const mod2Pow = (exp) => {
        if (powMemo[exp] !== undefined) {
            return powMemo[exp];
        }

        if (exp === 0) return 1;

        const modPow = (mod2Pow(exp - 1) * 2) % MOD;
        powMemo[exp] = modPow;
        return modPow;
    };

    nums.sort((a, b) => a - b);

    let seqNum = 0;
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        if (nums[left] + nums[right] > target) {
            right--;
        } else {
            seqNum += mod2Pow(right - left);
            seqNum %= MOD;
            left++;
        }
    }

    return seqNum;
};
// @lc code=end

numSubseq([3, 5, 6, 7], 9);
