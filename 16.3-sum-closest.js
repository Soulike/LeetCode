/*
 * @lc app=leetcode id=16 lang=javascript
 *
 * [16] 3Sum Closest
 */

// @lc code=start

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const threeSumClosest = function (nums, target) 
{
    // 已经计算出过的和
    /** @type {Set<number>} */
    const calculatedSums = new Set();
    nums.sort((a, b) => a - b);
    let diff = 0;
    let plus = 0;
    let minus = 0;
    while (true)
    {
        plus = target + diff;
        minus = target - diff;
        if (has3Sum(nums,calculatedSums, plus))
        {
            return plus;
        }
        if (has3Sum(nums,calculatedSums, minus))
        {
            return minus;
        }
        diff++;
    }
};

/**
 * @param {number[]} sortedNums
 * @param {Set<number>} calculatedSums
 * @param {number} target
 * @return {boolean}
 */
function has3Sum(sortedNums, calculatedSums, target)
{
    if (calculatedSums.has(target))
    {
        return true;
    }

    let left = 0;
    let right = 2;
    let sum = 0;
    const length = sortedNums.length;
    for (let i = 0; i < length - 2; i++)
    {
        if (sortedNums[i] === sortedNums[i - 1])
        {
            continue;
        }
        left = i + 1;
        right = length - 1;
        while (left < right)
        {
            sum = sortedNums[left] + sortedNums[right] + sortedNums[i];
            calculatedSums.add(sum);   // 缓存起来
            if (sum > target)
            {
                right--;
                while (left < right && sortedNums[right] === sortedNums[right + 1])
                {
                    right--;
                }
            }
            else if (sum < target)
            {
                left++;
                while (left < right && sortedNums[left] === sortedNums[left - 1])
                {
                    left++;
                }
            }
            if (sum === target)
            {
                return true;
            }
        }
    }
    return false;
}
// @lc code=end

