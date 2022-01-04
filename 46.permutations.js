/*
 * @lc app=leetcode id=46 lang=javascript
 *
 * [46] Permutations
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) 
{
    const usedNums = new Set();
    const results = [];

    function helper()
    {
        if (usedNums.size === nums.length)
        {
            results.push([...usedNums]);
        }
        else
        {
            for (const num of nums)
            {
                if (!usedNums.has(num))
                {
                    usedNums.add(num);
                    helper();
                    usedNums.delete(num);
                }
            }
        }
    }

    helper();

    return results;
};
// @lc code=end

