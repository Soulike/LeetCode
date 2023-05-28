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

    const newCuts = [0, ...cuts, n];

    /** @type {Map<string, number>} */
    const memo = new Map();

    /**
     * @param {number} newCutsLeft
     * @param {number} newCutsRight
     * @returns {number}
     */
    const getMinCost = (newCutsLeft, newCutsRight) => {
        if (newCutsRight - newCutsLeft === 1) {
            return 0;
        }

        const memoKey = `${newCutsLeft}-${newCutsRight}`;
        if (memo.has(memoKey)) return memo.get(memoKey);

        let minCost = Infinity;
        for (let i = newCutsLeft + 1; i < newCutsRight; i++) {
            const leftMinCost = getMinCost(newCutsLeft, i);

            const rightMinCost = getMinCost(i, newCutsRight);

            minCost = Math.min(
                minCost,
                leftMinCost +
                    rightMinCost +
                    newCuts[newCutsRight] -
                    newCuts[newCutsLeft],
            );
        }

        memo.set(memoKey, minCost);
        return minCost;
    };

    const result = getMinCost(0, newCuts.length - 1);
    return result;
};
// @lc code=end

minCost(7, [1, 3, 4, 5]);
