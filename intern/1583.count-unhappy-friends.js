/*
 * @lc app=leetcode id=1583 lang=javascript
 *
 * [1583] Count Unhappy Friends
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} preferences
 * @param {number[][]} pairs
 * @return {number}
 */
const unhappyFriends = function (n, preferences, pairs) {
    let count = 0;
    /** @type {Map<number, number>} */
    const pairsMap = new Map();
    for (const [i, j] of pairs) {
        pairsMap.set(i, j);
        pairsMap.set(j, i);
    }

    for (let i = 0; i < n; i++) {
        const pairedFriend = pairsMap.get(i);
        if (pairedFriend !== undefined) {
            const preference = preferences[i];
            const betterFriends = preference.slice(
                0,
                preference.indexOf(pairedFriend),
            );
            for (const betterFriend of betterFriends) {
                const betterFriendPreference = preferences[betterFriend];
                const betterFriendPairedFriend = pairsMap.get(betterFriend);
                const selfIndexInPetterFriendPreference =
                    betterFriendPreference.indexOf(i);
                const betterFriendPairedFriendIndexInPetterFriendPreference =
                    betterFriendPreference.indexOf(betterFriendPairedFriend);
                if (
                    selfIndexInPetterFriendPreference <
                    betterFriendPairedFriendIndexInPetterFriendPreference
                ) {
                    count++;
                    break;
                }
            }
        }
    }
    return count;
};
// @lc code=end
