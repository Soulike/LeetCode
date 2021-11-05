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
    k = Math.min(arr.length - 1, k);

    const numberToConsecutiveWinCount = new Map();
    let index1 = 0;
    let index2 = 1;
    let winningNumber = 0;
    let losingNumber = 0;
    while (true)
    {
        if (arr[index1] > arr[index2])
        {
            winningNumber = arr[index1];
            losingNumber = arr[index2];
            index2 = (index2 + 1) % arr.length;
        }
        else
        {
            winningNumber = arr[index2];
            losingNumber = arr[index1];
            index1 = (index2 + 1) % arr.length;
            [index1, index2] = [index2, index1];
        }
        numberToConsecutiveWinCount.set(winningNumber,
            (numberToConsecutiveWinCount.get(winningNumber) ?? 0) + 1);
        numberToConsecutiveWinCount.set(losingNumber, 0);
        if (numberToConsecutiveWinCount.get(winningNumber) === k)
        {
            return winningNumber;
        }
    }
};
// @lc code=end