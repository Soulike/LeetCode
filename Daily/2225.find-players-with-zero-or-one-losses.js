/*
 * @lc app=leetcode id=2225 lang=javascript
 *
 * [2225] Find Players With Zero or One Losses
 */

// @lc code=start
/**
 * @param {[winner: number, loser: number][]} matches
 * @return {number[][]}
 */
var findWinners = function (matches) {
    /** @type {Map<number, number>} */
    const playerToInDegrees = new Map();
    /** @type {Set<number>} */
    const players = new Set();

    for (const [winner, loser] of matches) {
        playerToInDegrees.set(loser, (playerToInDegrees.get(loser) ?? 0) + 1);
        players.add(winner);
        players.add(loser);
    }

    const playersArr = Array.from(players).sort((a, b) => a - b);
    /** @type {number[]} */
    const notLostAnyMatchPlayers = [];
    /** @type {number[]} */
    const lostOneMatchPlayers = [];

    for (const player of playersArr) {
        const inDegree = playerToInDegrees.get(player) ?? 0;
        if (inDegree === 0) {
            notLostAnyMatchPlayers.push(player);
        } else if (inDegree === 1) {
            lostOneMatchPlayers.push(player);
        }
    }

    return [notLostAnyMatchPlayers, lostOneMatchPlayers];
};
// @lc code=end
