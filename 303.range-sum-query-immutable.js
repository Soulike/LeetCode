/*
 * @lc app=leetcode id=303 lang=javascript
 *
 * [303] Range Sum Query - Immutable
 */

// @lc code=start
class NumArray
{
    /** nums 从 0 到 i 的和 */
    prefixSum;
    nums;

    /**
     * @param {number[]} nums
     */
    constructor(nums)
    {
        this.nums = nums;
        this.prefixSum = new Array(nums.length);
        this.prefixSum[0] = nums[0];
        for (let i = 1; i < nums.length; i++)
        {
            this.prefixSum[i] = this.prefixSum[i - 1] + nums[i];
        }
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    sumRange(left, right)
    {
        return this.prefixSum[right] - this.prefixSum[left] + this.nums[left];
    }
}


/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
// @lc code=end

