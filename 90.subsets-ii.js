/*
 * @lc app=leetcode id=90 lang=javascript
 *
 * [90] Subsets II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsetsWithDup = function (nums) 
{
    nums.sort();
    return toUnique(helper(nums, 0));
};

/**
 * @param {number[]} nums
 * @param {number} firstIndex
 * @return {number[][]}
 */
function helper(nums, firstIndex)
{
    const NUMS_LEN = nums.length;
    if (NUMS_LEN-firstIndex === 0)
    {
        return [[]];
    }

    /**@type number[][] */
    const results = [];
    const recursiveResults = helper(nums, firstIndex+1);

    results.push(...recursiveResults);

    for (const recursiveResult of recursiveResults)
    {
        results.push([nums[firstIndex], ...recursiveResult]);
    }

    return results;
}

/**
 * @param {number[][]} nums 
 * @return {number[][]}
 */
function toUnique(nums)
{
    const numsCopy = [...nums];
    numsCopy.sort();
    /**@type number[][] */
    const uniques = [numsCopy[0]];
    for (let i = 1; i < numsCopy.length; i++)
    {
        if (!isSame(numsCopy[i], numsCopy[i - 1]))
        {
            uniques.push(numsCopy[i])
        }
    }
    return uniques;
}

/**
 * 
 * @param {Array<any>} arr1
 * @param {Array<any>} arr2
 * @return {boolean}
 */
function isSame(arr1, arr2)
{
    return arr1.toString() === arr2.toString();
}
// @lc code=end