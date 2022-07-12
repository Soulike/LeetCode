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
const smallestRepunitDivByK = function (k) {
    if (k % 2 === 0 || k % 5 === 0) {
        // 2 和 5 的倍数的倍数不可能末位是 1
        return -1;
    }

    let length = 0;
    let remainder = 0;
    for (
        let i = 0;
        i < k;
        i++ // 最多只有 k 个余数
    ) {
        remainder = (remainder * 10 + 1) % k;
        length++;
        if (remainder === 0) {
            return length;
        }
    }
    return -1;
};
// @lc code=end
