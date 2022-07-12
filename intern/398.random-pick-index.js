/*
 * @lc app=leetcode id=398 lang=javascript
 *
 * [398] Random Pick Index
 */

// @lc code=start
/**
 * @param {number[]} nums
 */
class Solution {
    numToIndexes;

    constructor(nums) {
        this.numToIndexes = new Map();

        for (let i = 0; i < nums.length; i++) {
            if (this.numToIndexes.has(nums[i])) {
                const indexes = this.numToIndexes.get(nums[i]);
                indexes.push(i);
            } else {
                this.numToIndexes.set(nums[i], [i]);
            }
        }
    }
    /**
     * @param {number} target
     * @return {number}
     */
    pick(target) {
        const indexes = this.numToIndexes.get(target);
        return indexes[this.generateRandom(0, indexes.length - 1)];
    }

    generateRandom(start, end) {
        return Math.floor(start + Math.random() * (end - start + 1));
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.pick(target)
 */
// @lc code=end
