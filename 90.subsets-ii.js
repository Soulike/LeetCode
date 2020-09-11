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
    /**@type {number[][]} */
    const results = []; // 总的结果
    /**@type {number[][]} */
    let lastResults = [[]];       // 上一轮的结果
    /**@type {number[][]} */
    let currentResults = [[]];    // 当前轮的结果
    let lastAddedNum = NaN;     // 上一轮添加进集合的数字

    const NUMS_LEN = nums.length;
    for (let i = 0; i < NUMS_LEN; i++)
    {
        // 不重复地添加单个数字
        if (i === 0 || nums[i] !== nums[i-1])
        {
            currentResults.push([nums[i]]);
        }

        // 如果当前数字和上一个数字相同，只在上一轮末尾与当前相同的序列后添加当前数字
        if (nums[i] === lastAddedNum)
        {
            lastResults.forEach(lastResult =>
            {
                if (lastResult[lastResult.length - 1] === nums[i])
                {
                    currentResults.push([...lastResult, nums[i]]);
                }
            });
        }
        else    // 不相同，正常的排列组合
        {
            results.forEach(result =>
            {
                if (result.length !== 0)
                {
                    currentResults.push([...result, nums[i]]);
                }
            });
            lastAddedNum = nums[i];
        }
        results.push(...currentResults);
        lastResults = currentResults;
        currentResults = [];
    }
    return results;
};
// @lc code=end