/*
 * @lc app=leetcode id=303 lang=javascript
 *
 * [303] Range Sum Query - Immutable
 */

// @lc code=start
class NumArray {
  #nums;
  #prefixSum;

  /**
   * @param {number[]} nums
   */
  constructor(nums) {
    this.#nums = nums;
    this.#prefixSum = [];
    nums.reduce((prev, curr) => {
      this.#prefixSum.push(prev + curr);
      return prev + curr;
    }, 0);
  }
  /**
   * @param {number} left
   * @param {number} right
   * @return {number}
   */
  sumRange(left, right) {
    return this.#prefixSum[right] - this.#prefixSum[left] + this.#nums[left];
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
// @lc code=end
