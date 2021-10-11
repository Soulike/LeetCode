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
const numFriendRequests = function (ages)
{
    /** @type {Map<number, number>} */
    const ageToCount = new Map();
    for (const age of ages)
    {
        ageToCount.set(age,
            (ageToCount.get(age) ?? 0) + 1);
    }
    const ageSet = Array.from(ageToCount.keys());
    let count = 0;
    for (let i = 0; i < ageSet.length; i++)
    {
        const ageCount = ageToCount.get(ageSet[i]);
        if (ageCount > 1)
        {
            if (canSendRequest(ageSet[i], ageSet[i]))
            {
                count += ageCount * (ageCount - 1);
            }
        }

        for (let j = i + 1; j < ageSet.length; j++)
        {
            if (canSendRequest(ageSet[i], ageSet[j]))
            {
                count += ageToCount.get(ageSet[i]) * ageToCount.get(ageSet[j]);
            }
            if (canSendRequest(ageSet[j], ageSet[i]))
            {
                count += ageToCount.get(ageSet[i]) * ageToCount.get(ageSet[j]);
            }
        }
    }
    return count;
};

function canSendRequest(fromAge, toAge)
{
    return (toAge > 0.5 * fromAge + 7)
        && (toAge <= fromAge)
        && (toAge <= 100 || fromAge >= 100);
}
// @lc code=end