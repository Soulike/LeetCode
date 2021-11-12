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
    const cityToConnectedRoadCountArray = Array.from(cityToConnectedRoadCount).sort((a, b) => b[1] - a[1]);

    /**
     * 具有最大的两个出度的城市列表
     * @type {[number, number][]}
     */
    const max2RouteCountCityToRouteCounts = [];
    let nThMaxRouteCount = 0;
    let lastRouteCount = -1;
    for (const [city, roadCount] of cityToConnectedRoadCountArray)
    {
        if (lastRouteCount !== roadCount)
        {
            nThMaxRouteCount++;
            lastRouteCount = roadCount;
        }
        if (nThMaxRouteCount > 2)
        {
            break;
        }
        max2RouteCountCityToRouteCounts.push([city, roadCount]);
    }

    let maxRoadCountBetweenCities = 0;
    for (let i = 0; i < max2RouteCountCityToRouteCounts.length; i++)
    {
        const city1ToRoadCount = max2RouteCountCityToRouteCounts[i];
        for (let j = i + 1; j < max2RouteCountCityToRouteCounts.length; j++)
        {
            const city2ToRoadCount = max2RouteCountCityToRouteCounts[j];
            if (connected[city1ToRoadCount[0]][city2ToRoadCount[0]])
            {
                maxRoadCountBetweenCities = Math.max(
                    maxRoadCountBetweenCities,
                    city1ToRoadCount[1] + city2ToRoadCount[1] - 1
                );
            }
            else if(city1ToRoadCount[1] + city2ToRoadCount[1] >= maxRoadCountBetweenCities)
            {
                maxRoadCountBetweenCities = city1ToRoadCount[1] + city2ToRoadCount[1];
                // 两个城市没有连接且能取得最大值，继续遍历只能取得相等或更小的值，不用继续遍历
                break;
            }
        }
    }
    return maxRoadCountBetweenCities;
};
// @lc code=end