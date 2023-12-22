/*
 * @lc app=leetcode id=1422 lang=javascript
 *
 * [1422] Maximum Score After Splitting a String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var maxScore = function (s) {
    /*
    score = leftZeros + rightOnes
          = leftZeros + (totalOnes - leftOnes)
          = totalOnes + (leftZeros - leftOnes)
    => Max(score) = totalOnes + Max(leftZeros - leftOnes)
    */

    let totalOnes = 0;
    let leftZeros = 0;
    let leftOnes = 0;

    let maxLeftZeroOneDiff = -Infinity;

    for (let i = 0; i < s.length - 1; i++) {
        if (s[i] === '1') {
            totalOnes++;
            leftOnes++;
        } else {
            leftZeros++;
        }

        maxLeftZeroOneDiff = Math.max(maxLeftZeroOneDiff, leftZeros - leftOnes);
    }

    if (s[s.length - 1] === '1') totalOnes++;

    return totalOnes + maxLeftZeroOneDiff;
};
// @lc code=end
