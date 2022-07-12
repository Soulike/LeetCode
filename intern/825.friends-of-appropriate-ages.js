/*
 * @lc app=leetcode id=825 lang=javascript
 *
 * [825] Friends Of Appropriate Ages
 */

// @lc code=start
/**
 * @param {number[]} ages
 * @return {number}
 */
const numFriendRequests = function (ages) {
    /** @type {Map<number, number>} */
    const ageToCount = new Map();
    for (const age of ages) {
        ageToCount.set(age, (ageToCount.get(age) ?? 0) + 1);
    }
    const ageSet = Array.from(ageToCount.keys()).sort((a, b) => a - b);
    const ageSetLength = ageSet.length;
    let count = 0;
    for (let i = ageSetLength - 1; i >= 0; i--) {
        for (let j = i; j >= 0; j--) {
            // Aage >= Bage
            const Aage = ageSet[i];
            const Bage = ageSet[j];
            const AageCount = ageToCount.get(Aage);
            const BageCount = ageToCount.get(Bage);
            if (i === j) {
                if (AageCount > 1 && Bage > Aage * 0.5 + 7) {
                    // 同年龄互粉
                    count += AageCount * (AageCount - 1);
                }
            } else if (Bage > Aage * 0.5 + 7) {
                count += AageCount * BageCount;
            }
        }
    }
    return count;
};
// @lc code=end
