/*
 * @lc app=leetcode id=60 lang=javascript
 *
 * [60] Permutation Sequence
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function (n, k) {
    let currentPermutation = [];
    let permutationCount = 0;
    const used = new Set();

    function backtrack() {
        if (currentPermutation.length === n) {
            permutationCount++;
            if (permutationCount === k) {
                return false;
            }
            return true;
        } else {
            for (let j = 1; j <= n; j++) {
                if (!used.has(j)) {
                    used.add(j);
                    currentPermutation.push(j);
                    if (!backtrack()) {
                        return false;
                    }
                    currentPermutation.pop();
                    used.delete(j);
                }
            }
            return true;
        }
    }

    backtrack();
    return currentPermutation.join('');
};
// @lc code=end
