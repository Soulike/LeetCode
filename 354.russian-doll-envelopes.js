/*
 * @lc app=leetcode id=354 lang=javascript
 *
 * [354] Russian Doll Envelopes
 */

// @lc code=start
/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes)
{
    envelopes.sort(([w1, h1], [w2, h2]) =>
    {
        if (w1 !== w2)
        {
            return w1 - w2; // 宽度小的在前
        }
        else
        {
            return h2 - h1; // 高度大的在前
        }
    });

    const heights = new Array(envelopes.length);
    for (let i = 0; i < heights.length; i++)
    {
        heights[i] = envelopes[i][1];
    }

    return lengthOfLIS(heights);
};

// From https://labuladong.gitee.io/algo/3/24/79/
function lengthOfLIS(nums)
{
    let piles = 0, n = nums.length;
    let top = new Array(n);
    for (let i = 0; i < n; i++)
    {
        // 要处理的扑克牌
        let poker = nums[i];
        let left = 0, right = piles;
        // 二分查找插入位置
        while (left < right)
        {
            let mid = Math.floor((left + right) / 2);
            if (top[mid] >= poker)
                right = mid;
            else
                left = mid + 1;
        }
        if (left == piles) piles++;
        // 把这张牌放到牌堆顶
        top[left] = poker;
    }
    // 牌堆数就是 LIS 长度
    return piles;
}
// @lc code=end