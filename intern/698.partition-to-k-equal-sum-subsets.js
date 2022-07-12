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
var canPartitionKSubsets = function (nums, k) {
    const numsSum = nums.reduce((prev, curr) => prev + curr);
    const targetSum = numsSum / k;

    if (!Number.isInteger(targetSum)) {
        return false;
    }

    const usedIndexes = new Set();
    // 在使用的数字相同时，桶的装法肯定也是一样的，只是装的顺序不同，结果肯定是相同的
    const usedIndexesToResultCache = [];

    function backtrack(startIndex, leftBucketCount, currentBucketLeftRoom) {
        if (leftBucketCount === 0) {
            // 桶用完了
            return true;
        }
        if (currentBucketLeftRoom === 0) {
            // 当前桶装满了
            // 后面的桶能装满吗？
            const result = backtrack(0, leftBucketCount - 1, targetSum);
            usedIndexesToResultCache[convertIndexSetToNum(usedIndexes)] =
                result;
            return result;
        }

        if (
            usedIndexesToResultCache[convertIndexSetToNum(usedIndexes)] !==
            undefined
        ) {
            return usedIndexesToResultCache[convertIndexSetToNum(usedIndexes)];
        }

        for (let i = startIndex; i < nums.length; i++) {
            if (!usedIndexes.has(i) && currentBucketLeftRoom >= nums[i]) {
                usedIndexes.add(i);
                if (
                    backtrack(
                        i,
                        leftBucketCount,
                        currentBucketLeftRoom - nums[i],
                    )
                ) {
                    return true;
                }
                usedIndexes.delete(i);
            }
        }
        return false;
    }

    const result = backtrack(0, k, targetSum);
    return result;
};

function convertIndexSetToNum(set) {
    let result = 0;
    for (const i of set) {
        result += 1 << i;
    }
    return result;
}

// @lc code=end
