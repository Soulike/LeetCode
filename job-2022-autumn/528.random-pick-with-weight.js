/*
 * @lc app=leetcode id=528 lang=javascript
 *
 * [528] Random Pick with Weight
 */

// @lc code=start
class Solution {
    prefixSum;
    /**
     * @param {number[]} w
     */
    constructor(w) {
        this.prefixSum = [0];
        for (const n of w) {
            this.prefixSum.push(this.prefixSum[this.prefixSum.length - 1] + n);
        }
    }

    /**
     * @return {number}
     */
    pickIndex() {
        const num = Solution.getRandomNumber(
            this.prefixSum[0],
            this.prefixSum[this.prefixSum.length - 1],
        );

        const index = binarySearchLowerBoundary(this.prefixSum, num);

        return index;
    }

    /**
     * [start, end)
     * @param {number} start
     * @param {number} end
     * @returns {number}
     */
    static getRandomNumber(start, end) {
        return start + Math.random() * (end - start);
    }
}

/**
 *
 * @param {number[]} nums
 * @param {number} target
 * @returns {number}
 */
function binarySearchLowerBoundary(nums, target) {
    if (target < nums[0]) return -1;
    if (target > nums[nums.length - 1]) {
        return nums.length - 1;
    }

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);

        if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] < target) {
            if (nums[mid + 1] > target) {
                return mid;
            } else {
                left = mid + 1;
            }
        } else if (nums[mid] === target) {
            if (mid === 0 || nums[mid - 1] < target) {
                return mid;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */
// @lc code=end
