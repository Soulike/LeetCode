/*
 * @lc app=leetcode id=473 lang=javascript
 *
 * [473] Matchsticks to Square
 */

// @lc code=start
/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
var makesquare = function (matchsticks) {
    const sum = matchsticks.reduce((prev, curr) => prev + curr);
    const targetLength = sum / 4;
    if (!Number.isInteger(targetLength)) {
        return false;
    }
    for (const matchstick of matchsticks) {
        if (matchstick > targetLength) {
            return false;
        }
    }
    return helper(matchsticks, 0, [0, 0, 0, 0], targetLength);
};

/**
 *
 * @param {number[]} matchsticks
 * @param {number} startIndex
 * @param {[number, number, number, number]} currentLengths
 * @param {number} targetLength
 * @returns {boolean}
 */
function helper(matchsticks, startIndex, currentLengths, targetLength) {
    if (startIndex === matchsticks.length) {
        return true;
    }

    const currentMatchstick = matchsticks[startIndex];
    for (let i = 0; i < 4; i++) {
        if (currentLengths[i] + currentMatchstick <= targetLength) {
            currentLengths[i] += currentMatchstick;
            if (
                helper(
                    matchsticks,
                    startIndex + 1,
                    currentLengths,
                    targetLength,
                )
            )
            {
                return true;
            }
            currentLengths[i] -= currentMatchstick;
        }
    }
    return false;
}
// @lc code=end
console.log(makesquare([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 102]));
