/*
 * @lc app=leetcode id=560 lang=javascript
 *
 * [560] Subarray Sum Equals K
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const subarraySum = function (nums, k) {
  const LENGTH = nums.length;
  let count = 0;
  /** **`[0,i]`连续子数组之和**与**其出现次数**的映射 */
  const sumToTimes = new Map([[0, 1]]);
  /** `[0,i]` 的和 */
  let sum = 0;
  for (let i = 0; i < LENGTH; i++) {
    sum += nums[i];
    /* 
        在 j < i 的条件下，如果说 [0,i] 的和与 [0,j] 的和相差 k，那么 [i+1,j] 的和就是 k。
        sum 是 [0,i] 的和，那么 sum-k 出现几次就代表有 [i+1,j] 的情况出现了几次，即有几个和为 k 的连续数组
        当 sum-k === 0 时，[0,i] 就是一个符合条件的数组，因此需要 count+=1，这就是为什么 sumToTimes 要有初始化映射 0 -> 1
        */
    count += sumToTimes.get(sum - k) ?? 0;
    const sumTimes = sumToTimes.get(sum);
    sumToTimes.set(sum, sumTimes === undefined ? 1 : sumTimes + 1);
  }
  return count;
};
// @lc code=end
