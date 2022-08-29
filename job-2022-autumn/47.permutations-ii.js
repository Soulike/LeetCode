/*
 * @lc app=leetcode id=47 lang=javascript
 *
 * [47] Permutations II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    /** @type {number[]} */
    const current = [];
    /** @type {number[][]} */
    const permutations = [];
    /** @type {Set<number>} */
    const usedNumIndexes = new Set();

    const backtrack = () => {
        const currentUsedNums = new Set();
        if (current.length === nums.length) {
            permutations.push([...current]);
        } else {
            for (let i = 0; i < nums.length; i++) {
                const num = nums[i];
                if (!currentUsedNums.has(num) && !usedNumIndexes.has(i)) {
                    currentUsedNums.add(num);

                    current.push(num);
                    usedNumIndexes.add(i);
                    backtrack();
                    usedNumIndexes.delete(i);
                    current.pop();
                }
            }
        }
    };

    backtrack();
    return permutations;
};
// @lc code=end
