/*
 * @lc app=leetcode id=926 lang=javascript
 *
 * [926] Flip String to Monotone Increasing
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minFlipsMonoIncr = function (s) {
    let currentOnesCount = 0;
    let currentMinFlipCount = 0;

    for (const c of s) {
        if (c === '1') {
            currentOnesCount++;
        } else {
            if (currentOnesCount > 0) {
                const flipCountIfFlipCurrentZero = currentMinFlipCount + 1;
                const flipCountIfFlipAllBeforeOnes = currentOnesCount;

                currentMinFlipCount = Math.min(
                    flipCountIfFlipCurrentZero,
                    flipCountIfFlipAllBeforeOnes,
                );
            } else {
                // just append and do nothing
            }
        }
    }

    return currentMinFlipCount;
};
// @lc code=end

minFlipsMonoIncr('00011000'); // 2
