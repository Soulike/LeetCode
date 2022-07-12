/*
 * @lc app=leetcode id=974 lang=javascript
 *
 * [974] Subarray Sums Divisible by K
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const subarraysDivByK = function (nums, k) {
    const sumToCount = new Map();
    sumToCount.set(0, 1); // 和余数是 0 也符合题意

    let subarrayCount = 0;
    let subarraySumDivByK = 0;
    for (const num of nums) {
        subarraySumDivByK = (subarraySumDivByK + num) % k;
        if (subarraySumDivByK < 0) {
            // 只需要正余数
            subarraySumDivByK += k;
        }
        subarrayCount += sumToCount.get(subarraySumDivByK) ?? 0;
        sumToCount.set(
            subarraySumDivByK,
            (sumToCount.get(subarraySumDivByK) ?? 0) + 1,
        );
    }

    return subarrayCount;
};
// @lc code=end
