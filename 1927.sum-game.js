/*
 * @lc app=leetcode id=1927 lang=javascript
 *
 * [1927] Sum Game
 */

// @lc code=start
/**
 * @param {string} num
 * @return {boolean}
 */
var sumGame = function (num)
{
    /**
     * 每次操作，值都只能变大
     */

    const n = num.length;
    let leftSum = 0;
    let rightSum = 0;
    let slotCount = 0;

    for (let i = 0; i < n / 2; i++)
    {
        if (num[i] === '?')
        {
            slotCount++;
        }
        else
        {
            leftSum += Number.parseInt(num[i]);
        }

        if (num[n - i - 1] === '?')
        {
            slotCount--;
        }
        else
        {
            rightSum += Number.parseInt(num[n - i - 1]);
        }
    }

    // 有问号的一侧和还大，那 alice 一定赢
    if (leftSum >= rightSum && slotCount > 0
        || leftSum <= rightSum && slotCount < 0)
    {
        return true;
    }

    slotCount = Math.abs(slotCount);
    const smallerSum = Math.min(leftSum, rightSum);
    const largerSum = Math.max(leftSum, rightSum);

    return (slotCount * 9 / 2 !== largerSum - smallerSum);
};
// @lc code=end