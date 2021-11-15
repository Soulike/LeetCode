/*
 * @lc app=leetcode id=368 lang=javascript
 *
 * [368] Largest Divisible Subset
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const largestDivisibleSubset = function (nums)
{
    nums.sort((a, b) => a - b);

    /**
     * 所有的子集
     * @type {number[][]}
     */
    const subsets = [];
    /**
     * 最长子集的长度
     */
    let maxLength = 0;
    /**
     * 指向最长子集的引用
     * @type {number[]}
     */
    let maxLengthSubset = [];

    for (const num of nums)
    {
        let hasDivisibleSubset = false;
        // 因为会改变数组，因此要保存长度
        const subsetLength = subsets.length;
        /**
         * 对于 `num` 可以添加到末尾的最长子集的长度
         */
        let subsetMaxLength = 0;
        /**
         * 对于 `num` 可以添加到末尾的最长子集
         */
        let subsetWithMaxLength = [];
        for (let i = 0; i < subsetLength; i++)
        {
            const subset = subsets[i];
            const lastNum = subset[subset.length - 1];
            if (num % lastNum === 0)
            {
                hasDivisibleSubset = true;
                if (subset.length > subsetMaxLength)
                {
                    subsetMaxLength = subset.length;
                    subsetWithMaxLength = subset;
                }
            }
        }

        if (hasDivisibleSubset)
        {
            // 复制一份，因为可能还有其他因数的数字拼接
            subsets.push([...subsetWithMaxLength]);
            subsetWithMaxLength.push(num);
            if (subsetWithMaxLength.length > maxLength)
            {
                maxLength = subsetWithMaxLength.length;
                maxLengthSubset = subsetWithMaxLength;
            }
        }
        else    // 没有可以添加到末尾的子集，是新子集
        {
            const newSubset = [num];
            subsets.push(newSubset);
            if (1 > maxLength)
            {
                maxLength = 1;
                maxLengthSubset = newSubset;
            }
        }
    }
    return maxLengthSubset;
};
// @lc code=end