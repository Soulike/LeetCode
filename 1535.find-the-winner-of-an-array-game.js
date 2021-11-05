/*
 * @lc app=leetcode id=1535 lang=javascript
 *
 * [1535] Find the Winner of an Array Game
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
const getWinner = function (arr, k)
{
    // 如果一个数已经赢了所有剩下的数，那么就不需要再继续比较下去
    k = Math.min(arr.length - 1, k);

    let lastWinningNumber = NaN;
    let lastWinningNumberConsecutiveCount = 0;

    let index1 = 0; // 被比较的前数下标
    let index2 = 1; // 被比较的后数下标
    let winningNumber = 0;
    let losingNumber = 0;
    while (true)
    {
        // 前数赢，后数下标后移
        if (arr[index1] > arr[index2])
        {
            winningNumber = arr[index1];
            losingNumber = arr[index2];
            index2 = (index2 + 1) % arr.length; // 注意成环
        }
        // 后数赢，前数下标移动到后数下标+1，然后交换
        else
        {
            winningNumber = arr[index2];
            losingNumber = arr[index1];
            index1 = (index2 + 1) % arr.length;
            [index1, index2] = [index2, index1];
        }

        if (winningNumber === lastWinningNumber)
        {
            lastWinningNumberConsecutiveCount++;
        }
        else
        {
            lastWinningNumber = winningNumber;
            lastWinningNumberConsecutiveCount = 1;
        }
        
        if (lastWinningNumberConsecutiveCount === k)
        {
            return winningNumber;
        }
    }
};
// @lc code=end