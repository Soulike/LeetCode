/*
 * @lc app=leetcode id=2492 lang=javascript
 *
 * [2492] Minimum Score of a Path Between Two Cities
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var minScore = function (n, roads) {
    /** @type {Map<number, number>[]} */
    const neighbors = [];
    for (let i = 1; i <= n; i++) {
        neighbors[i] = new Map();
    }

    for (const [city1, city2, distance] of roads) {
        neighbors[city1].set(city2, distance);
        neighbors[city2].set(city1, distance);
    }

    roads.sort(([, , distance1], [, , distance2]) => distance1 - distance2);

    /** @type {Map<string, boolean>} */
    const hasPathMemo = new Map();
    /** @type {Set<number>} */
    const visited = new Set();

    for (const [city1, city2, distance] of roads) {
        if (
            hasPath(neighbors, 1, city1, visited, hasPathMemo) &&
            hasPath(neighbors, n, city2, visited, hasPathMemo)
        ) {
            return distance;
        }
    }

    return -1;
};

/**
 *
 * @param {Map<number, number>[]} neighbors
 * @param {number} city1
 * @param {number} city2
 * @param {Set<number>} visited
 * @param {Map<string, boolean>} memo
 * @returns {boolean}
 */
function hasPath(neighbors, city1, city2, visited, memo) {
    if (city1 === city2) return true;

    if (city1 > city2) {
        [city1, city2] = [city2, city1];
    }

    const memoKey = `${city1}-${city2}`;
    if (memo.has(memoKey)) {
        // @ts-ignore
        return memo.get(memoKey);
    }

    const city1Neighbors = neighbors[city1];
    if (city1Neighbors.has(city2)) {
        memo.set(memoKey, true);
        return true;
    }

    for (const [city1Neighbor] of city1Neighbors) {
        if (!visited.has(city1Neighbor)) {
            visited.add(city1Neighbor);
            try {
                if (hasPath(neighbors, city1Neighbor, city2, visited, memo)) {
                    memo.set(memoKey, true);
                    return true;
                }
            } finally {
                visited.delete(city1Neighbor);
            }
        }
    }

    memo.set(memoKey, false);
    return false;
}
// @lc code=end
