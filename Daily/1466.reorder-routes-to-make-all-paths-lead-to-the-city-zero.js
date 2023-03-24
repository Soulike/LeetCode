/*
 * @lc app=leetcode id=1466 lang=javascript
 *
 * [1466] Reorder Routes to Make All Paths Lead to the City Zero
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minReorder = function (n, connections) {
    /** @type {[city: number, isReversed: boolean][][]>} */
    const neighbors = [];
    for (let i = 0; i < n; i++) {
        neighbors[i] = [];
    }

    for (const [from, to] of connections) {
        neighbors[from].push([to, false]);
        neighbors[to].push([from, true]);
    }

    let reversedCount = 0;
    /** @type {Set<number>} */
    const visited = new Set();
    visited.add(0);

    /**
     * @param {number} city
     * @returns {void}
     */
    const dfs = (city) => {
        const cityNeighbors = neighbors[city];
        for (const [neighbor, isReversed] of cityNeighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                if (!isReversed) reversedCount++;
                dfs(neighbor);
            }
        }
    };

    dfs(0);

    return reversedCount;
};
// @lc code=end

minReorder(3, [
    [1, 0],
    [2, 0],
]);
