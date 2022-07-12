/*
 * @lc app=leetcode id=670 lang=javascript
 *
 * [670] Maximum Swap
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number}
 */
var maximumSwap = function (num) {
    /**
     * 拆分数字，0-n 低位到高位
     *
     * 划分 0-9 的桶
     *
     * 遍历 nums，记录每个数字出现的最低位位置，放进桶里
     *
     * 从桶 9 遍历到 0，每次比较桶里的位置与当前的最高位，如果桶里的位置小，那么就应该发生交换
     */

    const nums = splitNum(num);
    const n = nums.length;

    const numToLowestIndex = new Array(10);

    for (let i = n - 1; i >= 0; i--) {
        numToLowestIndex[nums[i]] = i;
    }

    OUT: for (let i = n - 1; i >= 0; i--) {
        for (let j = 9; j >= 0; j--) {
            if (numToLowestIndex[j] < i && j > nums[i]) {
                [nums[numToLowestIndex[j]], nums[i]] = [
                    nums[i],
                    nums[numToLowestIndex[j]],
                ];
                break OUT;
            }
        }
    }

    return joinNum(nums);
};

/**
 *
 * @param {number} num
 * @returns {number[]} - 0-n 低位到高位
 */
function splitNum(num) {
    const result = [];
    if (num === 0) {
        result.push(0);
        return result;
    }
    while (num > 0) {
        result.push(num % 10);
        num = Math.floor(num / 10);
    }
    return result;
}

/**
 *
 * @param {number[]} nums - 0-n 低位到高位
 * @returns {number}
 */
function joinNum(nums) {
    let result = 0;
    for (let i = nums.length - 1; i >= 0; i--) {
        result *= 10;
        result += nums[i];
    }
    return result;
}
// @lc code=end

maximumSwap(9973);
