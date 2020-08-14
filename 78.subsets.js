/*
 * @lc app=leetcode id=78 lang=javascript
 *
 * [78] Subsets
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function (nums) 
{
    /**@type {number[][]} */
    const results = [[]];
    /**@type {number[][]} */
    let lastResults = [];   // 上一轮迭代的结果
    /**@type {number[][]} */
    let currentResults = [];    // 这一轮迭代的结果
    const LENGTH = nums.length;
    for (let i = 1; i <= LENGTH; i++)   // i 是这一次迭代结果中所有 number 数组的长度
    {
        if (i === 1)    // 特殊情况，单独处理
        {
            currentResults = nums.map(num => [num]);
        }
        else    // i > 1
        {
            // 遍历上一次迭代结果，在其中添加一个数字
            for (const result of lastResults)
            {
                // 集合始终满足从小到大顺序，防止重复
                for (const num of nums)
                {
                    if (num < result[0])    // i>1，result[0] 一定存在
                    {
                        currentResults.push([num, ...result]);
                    }
                }
            }
        }
        // 把这一轮的结果保存下来，重置 currentResults
        results.push(...currentResults);
        lastResults = currentResults;
        currentResults = [];
    }
    return results;
};
// @lc code=end