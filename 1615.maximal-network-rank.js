/*
 * @lc app=leetcode id=1615 lang=javascript
 *
 * [1615] Maximal Network Rank
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
const maximalNetworkRank = function (n, roads)
{
    /** @type {Map<number, number>} */
    const cityToConnectedRoadCount = new Map();
    /** @type {boolean[][]} */
    const connected = [];
    for (let i = 0; i < n; i++)
    {
        connected[i] = [];
    }
    for (const [a, b] of roads)
    {
        cityToConnectedRoadCount.set(a,
            (cityToConnectedRoadCount.get(a) ?? 0) + 1);
        cityToConnectedRoadCount.set(b,
            (cityToConnectedRoadCount.get(b) ?? 0) + 1);
        connected[a][b] = true;
        connected[b][a] = true;
    }

    let maxRoadCountBetweenCities = 0;
    for (let i = 0; i < n; i++)
    {
        for (let j = i + 1; j < n; j++)
        {
            maxRoadCountBetweenCities = Math.max(
                maxRoadCountBetweenCities,
                (cityToConnectedRoadCount.get(i) ?? 0) + (cityToConnectedRoadCount.get(j) ?? 0) + (connected[i][j] ? -1 : 0)
            );
        }
    }
    return maxRoadCountBetweenCities;
};
// @lc code=end