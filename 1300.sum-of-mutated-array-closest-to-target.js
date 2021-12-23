/*
 * @lc app=leetcode id=1300 lang=javascript
 *
 * [1300] Sum of Mutated Array Closest to Target
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
const findBestValue = function (arr, target)
{
    arr.sort((a, b) => a - b);

    const LENGTH = arr.length;
    let i = 0;
    while (i < LENGTH && target > arr[i] * (LENGTH - i))
    {
        target -= arr[i++];
    }

    if (i === LENGTH)
    {
        return arr[LENGTH - 1];
    }

    let threshold = Math.floor(target / (LENGTH - i));
    
    // threshold 越接近平均数越好，这里需要检查一下平均数和平均数+1谁更接近
    if (target - threshold * (LENGTH - i) > (threshold + 1) * (LENGTH - i) - target)
    {
        threshold++;
    }
    return threshold;
};
// @lc code=end