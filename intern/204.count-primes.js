/*
 * @lc app=leetcode id=204 lang=javascript
 *
 * [204] Count Primes
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
    if (n <= 2) {
        return 0;
    }
    const arr = new Array(n);
    arr.fill(true);
    let count = n - 2;

    for (let i = 2; i < Math.sqrt(n); i++) {
        if (arr[i]) {
            for (let j = i; i * j < n; j++) {
                const index = i * j;
                if (arr[index]) {
                    arr[index] = false;
                    count--;
                }
            }
        }
    }

    return count;
};
// @lc code=end

countPrimes(3);
