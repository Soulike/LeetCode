/*
 * @lc app=leetcode id=1461 lang=javascript
 *
 * [1461] Check If a String Contains All Binary Codes of Size K
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
var hasAllCodes = function (s, k) {
    const totalNumCount = 2 ** k;
    const kMask = totalNumCount / 2 - 1;

    const numSet = new Set();

    let currentNum = Number.parseInt(s.slice(0, k), 2);

    numSet.add(currentNum);

    for (let i = k; i < s.length; i++) {
        currentNum &= kMask; // 抹掉最高位
        currentNum *= 2; // 左移
        currentNum += s[i] === '0' ? 0b0 : 0b1;
        numSet.add(currentNum);
        if (numSet.size === totalNumCount) {
            return true;
        }
    }

    return false;
};
// @lc code=end
