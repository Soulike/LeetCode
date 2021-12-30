/*
 * @lc app=leetcode id=1015 lang=javascript
 *
 * [1015] Smallest Integer Divisible by K
 */

// @lc code=start
/**
 * @param {number} k
 * @return {number}
 */
const smallestRepunitDivByK = function (k)
{
    if (k % 2 === 0 || k % 5 === 0)   // 2 和 5 的倍数的倍数不可能末位是 1
    {
        return -1;
    }

    // 若K不能被2或5整除，则一定有一个长度小于等于K且均由1组成的数，可以整除K
    let length = 0;
    let remainder = 0;
    while (true)
    {
        remainder = (remainder * 10 + 1) % k;
        length++;
        if (remainder === 0)
        {
            return length;
        }
    }
};
// @lc code=end

