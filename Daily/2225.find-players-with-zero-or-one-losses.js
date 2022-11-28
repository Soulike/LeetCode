/*
 * @lc app=leetcode id=2225 lang=javascript
 *
 * [2225] Find Players With Zero or One Losses
 */

// @lc code=start
/**
 * @param {number[][]} matches
 * @return {number[][]}
 */
var findWinners = function (matches) {
    /** @type {Set<number>} */
    const loseZeroTimePlayers = new Set();
    /** @type {Set<number>} */
    const loseOneTimePlayers = new Set();
    /** @type {Set<number>} */
    const lostMoreThanOneTimesPlayers = new Set();

    for (const [winner, loser] of matches) {
        if (
            !loseOneTimePlayers.has(winner) &&
            !lostMoreThanOneTimesPlayers.has(winner)
        ) {
            loseZeroTimePlayers.add(winner);
        }

        if (lostMoreThanOneTimesPlayers.has(loser)) {
            continue;
        } else if (loseZeroTimePlayers.has(loser)) {
            loseZeroTimePlayers.delete(loser);
            loseOneTimePlayers.add(loser);
        } else if (loseOneTimePlayers.has(loser)) {
            loseOneTimePlayers.delete(loser);
            lostMoreThanOneTimesPlayers.add(loser);
        } else {
            loseOneTimePlayers.add(loser);
        }
    }

    const loseZeroTimePlayersArray = [...loseZeroTimePlayers];
    loseZeroTimePlayersArray.sort((a, b) => a - b);
    const loseOneTimePlayersArray = [...loseOneTimePlayers];
    loseOneTimePlayersArray.sort((a, b) => a - b);

    return [loseZeroTimePlayersArray, loseOneTimePlayersArray];
};
// @lc code=end
