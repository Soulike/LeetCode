/*
 * @lc app=leetcode id=1547 lang=javascript
 *
 * [1547] Minimum Cost to Cut a Stick
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[]} cuts
 * @return {number}
 */
var minCost = function (n, cuts) {
    cuts.sort((a, b) => a - b);
    /** @type {Map<string, number>} */
    const memo = new Map();

    /**
     *
     * @param {number} n
     * @param {number[]} cuts
     * @returns {number}
     */
    const minCutRecursive = (n, cuts) => {
        if (n === 1 || cuts.length === 0) return 0;

        const memoKey = `${n}-${cuts.join(',')}`;

        if (memo.has(memoKey)) return memo.get(memoKey);

        let cost = Infinity;
        for (let i = 0; i < cuts.length; i++) {
            const cutPosition = cuts[i];

            const leftMinCost = minCutRecursive(cutPosition, cuts.slice(0, i));

            const rightMinCost = minCutRecursive(
                n - cutPosition,
                cuts.slice(i + 1).map((value) => value - cutPosition),
            );

            cost = Math.min(cost, n + leftMinCost + rightMinCost);
        }

        memo.set(memoKey, cost);
        return cost;
    };

    const result = minCutRecursive(n, cuts);

    return result;
};
// @lc code=end

minCost(9, [5, 6, 1, 4, 2]);
