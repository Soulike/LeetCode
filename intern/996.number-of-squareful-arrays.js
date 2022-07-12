/*
 * @lc app=leetcode id=996 lang=javascript
 *
 * [996] Number of Squareful Arrays
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var numSquarefulPerms = function (nums) {
    /**
     * 1. 统计数字的频率
     * 2. 确定每个数字可以组成平方数的另一个数
     * 3. 对每个数字做 backtrack，直到所有数字用完
     */

    const numToCount = getNumToCount(nums);
    const numToConnectedNums = new Map();

    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i !== j && canConstituteSquare(nums[i], nums[j])) {
                const connectedNums =
                    numToConnectedNums.get(nums[i]) ?? new Set();
                connectedNums.add(nums[j]);
                numToConnectedNums.set(nums[i], connectedNums);
            }
        }
    }

    let currentPermutationLength = 0;
    let permutationCount = 0;

    /**
     *
     * @param {number} num - 本次作为起点的数字
     */
    function backtrack(num) {
        if (currentPermutationLength === nums.length) {
            permutationCount++;
        } else {
            const connectedNums = numToConnectedNums.get(num);
            if (connectedNums !== undefined) {
                for (const connectedNum of connectedNums) {
                    const leftCount = numToCount.get(connectedNum);
                    if (leftCount > 0) {
                        numToCount.set(connectedNum, leftCount - 1);
                        currentPermutationLength++;
                        backtrack(connectedNum);
                        currentPermutationLength--;
                        numToCount.set(connectedNum, leftCount);
                    }
                }
            }
        }
    }

    for (const num of numToCount.keys()) {
        const leftCount = numToCount.get(num);
        if (leftCount > 0) {
            numToCount.set(num, leftCount - 1);
            currentPermutationLength++;
            backtrack(num);
            currentPermutationLength--;
            numToCount.set(num, leftCount);
        }
    }

    return permutationCount;
};

/**
 *
 * @param {number[]} nums
 * @returns {Map<number,number>}
 */
function getNumToCount(nums) {
    const numToCount = new Map();
    for (const num of nums) {
        numToCount.set(num, (numToCount.get(num) ?? 0) + 1);
    }

    return numToCount;
}

/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {boolean}
 */
function canConstituteSquare(a, b) {
    let left = 0;
    let right = 2 ** 31 - 1;
    const num = a + b;

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        const current = mid * mid;
        if (current === num) {
            return true;
        } else if (current > num) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return false;
}
// @lc code=end
