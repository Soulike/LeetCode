/*
 * @lc app=leetcode id=1282 lang=javascript
 *
 * [1282] Group the People Given the Group Size They Belong To
 */

// @lc code=start
/**
 * @param {number[]} groupSizes
 * @return {number[][]}
 */
var groupThePeople = function (groupSizes) {
    /** @type {number[][]} */
    const groups = [];

    /** @type {number[][]} */
    const sizeToUnfinishedGroups = [];

    for (let i = 0; i < groupSizes.length; i++) {
        const groupSize = groupSizes[i];
        const unfinishedGroup = sizeToUnfinishedGroups[groupSize] ?? [];
        unfinishedGroup.push(i);
        if (unfinishedGroup.length === groupSize) {
            groups.push(unfinishedGroup);
            sizeToUnfinishedGroups[groupSize] = [];
        } else {
            sizeToUnfinishedGroups[groupSize] = unfinishedGroup;
        }
    }

    return groups;
};
// @lc code=end
