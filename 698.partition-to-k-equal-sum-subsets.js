/*
 * @lc app=leetcode id=698 lang=javascript
 *
 * [698] Partition to K Equal Sum Subsets
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function (nums, k)
{
    const sum = nums.reduce((prev, curr) => prev + curr);
    const subsetSum = sum / k;
    if (!Number.isInteger(subsetSum))
    {
        return false;
    }

    const subsetIndexes = [];
    let currentSubsetIndexes = [];
    function backtrack(index, target)
    {
        if (target === 0)
        {
            subsetIndexes.push([...currentSubsetIndexes]);
        }
        else if (target > 0)
        {
            for (let i = index; i < nums.length; i++)
            {
                currentSubsetIndexes.push(i);
                backtrack(i + 1, target - nums[i]);
                currentSubsetIndexes.pop();
            }
        }
    }

    // 找到所有可以构成 target 的子集
    backtrack(0, subsetSum);

    return canCoverRangeWithoutOverlap(0, nums.length - 1, subsetIndexes);
};

/**
 * 确定 [rangeStart, rangeEnd] 范围内的所有坐标是否可以被 pointArrays 中的坐标点子集不重叠地完全覆盖
 * @param {number} rangeStart
 * @param {number} rangeEnd
 * @param {number[][]} pointArrays
 */
function canCoverRangeWithoutOverlap(rangeStart, rangeEnd, pointArrays)
{
    const usedIndexSet = new Set();
    const rangeSize = rangeEnd - rangeStart + 1;

    function backtrack(pointArraysIndex)
    {
        if (usedIndexSet.size === rangeSize)
        {
            return true;
        }

        OUT:
        for (let i = pointArraysIndex; i < pointArrays.length; i++)
        {
            // 合并 pointArrays[i]
            for (const index of pointArrays[i])
            {
                // 重叠了，忽略
                if (usedIndexSet.has(index))
                {
                    continue OUT;
                }
            }
            for (const index of pointArrays[i])
            {
                usedIndexSet.add(index);
            }

            if (backtrack(i + 1))
            {
                return true;
            }
            // 撤销合并 pointArrays[i]
            for (const index of pointArrays[i])
            {
                usedIndexSet.delete(index);
            }
        }

        return false;
    }

    const result = backtrack(0);
    return result;
}

// @lc code=end