/*
 * @lc app=leetcode id=1743 lang=javascript
 *
 * [1743] Restore the Array From Adjacent Pairs
 */

// @lc code=start
/**
 * @param {number[][]} adjacentPairs
 * @return {number[]}
 */
var restoreArray = function (adjacentPairs) {
    /** @type {Map<number, number[]>} */
    const neighbors = new Map();
    const visited = new Set();

    for (const [a, b] of adjacentPairs) {
        const aNeighbor = neighbors.get(a) ?? [];
        const bNeighbor = neighbors.get(b) ?? [];

        aNeighbor.push(b);
        bNeighbor.push(a);

        neighbors.set(a, aNeighbor);
        neighbors.set(b, bNeighbor);
    }

    const numbers = Array.from(neighbors.keys());

    /** @type {number[]}  */
    const result = [];
    /**
     * @param {number} start
     * @returns {boolean}
     */
    const dfs = (start) => {
        if (visited.size === numbers.length && result.length === numbers.length)
            return true;

        const neighbor = neighbors.get(start) ?? [];
        for (const next of neighbor) {
            if (!visited.has(next)) {
                visited.add(next);
                result.push(next);
                if (dfs(next)) return true;
                result.pop();
                visited.delete(next);
            }
        }
        return false;
    };

    for (const number of numbers) {
        // in/out degree is 1, must be the first element
        if ((neighbors.get(number) ?? []).length === 1) {
            result.push(number);
            visited.add(number);
            dfs(number);
            return result;
        }
    }
};
// @lc code=end

restoreArray([
    [2, 1],
    [3, 4],
    [3, 2],
]);
