/*
 * @lc app=leetcode id=1567 lang=javascript
 *
 * [1567] Maximum Length of Subarray With Positive Product
 */

// @lc code=start

class Part
{
    /**
     * @param {number} start 
     * @param {number} end 
     * @param {number} negativeCount 
     * @param {number} firstNegativeIndex 
     * @param {number} lastNegativeIndex 
     */
    constructor(start, end, negativeCount, firstNegativeIndex, lastNegativeIndex)
    {
        this.start = start;
        this.end = end;
        this.negativeCount = negativeCount;
        this.firstNegativeIndex = firstNegativeIndex;
        this.lastNegativeIndex = lastNegativeIndex;
    }
}

/**
 * @param {number[]} nums
 * @return {number}
 */
const getMaxLen = function (nums)
{
    /**
     * @type {Part[]}
     */
    const parts = [];
    
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

        parts.push(new Part(start, end, negativeCount, firstNegativeIndex, lastNegativeIndex));

        firstNegativeIndex = -1;
        negativeCount = 0;
    }

    let maxLen = 0;
    for (const part of parts)
    {
        if (!(part.negativeCount % 2))
        {
            maxLen = Math.max(maxLen, part.end - part.start + 1);
        }
        else
        {
            const cutLen = Math.min(part.end - part.lastNegativeIndex + 1, part.firstNegativeIndex - part.start + 1);
            maxLen = Math.max(maxLen, part.end - part.start + 1 - cutLen);
        }
    }
    return maxLen;
};
// @lc code=end

