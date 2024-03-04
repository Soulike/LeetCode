/*
 * @lc app=leetcode id=948 lang=javascript
 *
 * [948] Bag of Tokens
 */

// @lc code=start
/**
 * @param {number[]} tokens
 * @param {number} power
 * @return {number}
 */
var bagOfTokensScore = function (tokens, power) {
    /**
     * Greedy.
     * Use every score to exchange maximum power.
     * Use least power to exchange a score.
     */

    tokens.sort((a, b) => a - b);
    let left = 0;
    let right = tokens.length - 1;
    let currentScore = 0;
    let maxScore = 0;

    while (left <= right) {
        // Get maximum power with a score
        if (power < tokens[left]) {
            // Can't exchange. End.
            if (currentScore === 0) break;

            currentScore--;
            power += tokens[right];
            right--;
        }
        // Get a score with minimum power
        else {
            power -= tokens[left];
            left++;
            currentScore++;
            maxScore = Math.max(maxScore, currentScore);
        }
    }

    return maxScore;
};
// @lc code=end
