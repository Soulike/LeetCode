/*
 * @lc app=leetcode id=1567 lang=javascript
 *
 * [1567] Maximum Length of Subarray With Positive Product
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const getMaxLen = function (nums)
{
    let maxLen = 0;

    // 当前部分的信息
    let start = 0;
    let end = 0;
    let negativeCount = 0;
    let firstNegativeIndex = -1;
    let lastNegativeIndex = -1;

    let currentIndex = 0;
    while (currentIndex < nums.length)
    {
        while (nums[currentIndex] === 0
            && currentIndex < nums.length)
        {
            currentIndex++;
        }
        start = currentIndex;
        while (nums[currentIndex] !== 0
            && currentIndex < nums.length)
        {
            if (nums[currentIndex] < 0)
            {
                if (firstNegativeIndex === -1)
                {
                    firstNegativeIndex = currentIndex;
                }
                lastNegativeIndex = currentIndex;
                negativeCount++;
            }
            currentIndex++;
        }
        end = currentIndex - 1;

        if (!(negativeCount % 2))
        {
            maxLen = Math.max(maxLen, end - start + 1);
        }
        else
        {
            const cutLen = Math.min(end - lastNegativeIndex + 1, firstNegativeIndex - start + 1);
            maxLen = Math.max(maxLen, end - start + 1 - cutLen);
        }

        firstNegativeIndex = -1;
        negativeCount = 0;
    }

    return maxLen;
};
// @lc code=end

