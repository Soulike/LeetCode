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
var subarraysDivByK = function (nums, k) {
  /**
   * for the prefixSum of
   * nums[0-i] -> prefixSum[i] and
   * nums[0-j] -> prefixSum[j], i<j,
   *
   * we want to get the number of
   *    prefixSum[j] - prefixSum[i] = N*k, N is a integer
   * => prefixSum[j] = prefixSum[i] + N*k
   * => prefixSum[j] % k = (prefixSum[i] + N*k) % k
   * => prefixSum[j] % k = prefixSum[i] % k + N*k % k
   * => prefixSum[j] % k = prefixSum[i] % k
   *
   * So when we have remainder = prefixSum[j] % k,
   * we need to know how many prefixSum[i] % k = remainder (remainderToCount[remainder])
   * and add it to the result as the sum of nums[i-j] is divisible by k
   *
   * So for n=remainderToCount[remainder], we pick 2 from n, getting C(n,2) subarrays
   *
   * A special case is when remainder = 0.
   * Suppose we meet prefixSum[k] % k = 0, prefixSum[k] itself also meet the requirement, so we can also pick 1 from n, getting C(n,1) + C(n,2)
   */

  const N = nums.length;

  /** @type {Map<number, number>} */
  const remainderToCount = new Map();

  let currentPrefixSum = 0;

  let subArrayCount = 0;

  for (let i = 0; i < N; i++) {
    currentPrefixSum += nums[i];
    const reminder = ((currentPrefixSum % k) + k) % k; // mathematical MOD

    remainderToCount.set(reminder, (remainderToCount.get(reminder) ?? 0) + 1);
  }

  for (const [, count] of remainderToCount) {
    subArrayCount +=
      count % 2 === 1 ? count * ((count - 1) / 2) : (count / 2) * (count - 1);
  }

  subArrayCount += remainderToCount.get(0) ?? 0;

  return subArrayCount;
};
// @lc code=end

subarraysDivByK([4, 5, 0, -2, -3, 1], 5);
