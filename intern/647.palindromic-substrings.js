/*
 * @lc app=leetcode id=647 lang=javascript
 *
 * [647] Palindromic Substrings
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
const countSubstrings = function (s) {
    const LENGTH = s.length;
    /**
     * 从 s[i] 到 s[j] 是否是回文
     * @type {boolean[][]} */
    const dp = new Array(LENGTH);
    for (let i = 0; i < LENGTH; i++) {
        dp[i] = new Array(LENGTH);
        dp[i].fill(false);
    }

    let count = 0;
    for (let i = LENGTH - 1; i >= 0; i--) {
        for (let j = i; j < LENGTH; j++) {
            if (s[i] === s[j]) {
                if (i === j) {
                    count++;
                    dp[i][j] = true;
                } else {
                    if (j === i + 1) {
                        count++;
                        dp[i][j] = true;
                    }
                    if (j === i + 2) {
                        count++;
                        dp[i][j] = true;
                    } else if (dp[i + 1][j - 1] === true) {
                        count++;
                        dp[i][j] = true;
                    }
                }
            }
        }
    }
    return count;
};
// @lc code=end

console.log(countSubstrings('aaaaa'));
