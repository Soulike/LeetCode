/*
 * @lc app=leetcode id=786 lang=javascript
 *
 * [786] K-th Smallest Prime Fraction
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
const kthSmallestPrimeFraction = function (arr, k)
{
    /**
     * @type {{up: number, down: number, reversedValue: number}[]}
     */
    const fracs = [];
    const LENGTH = arr.length;
    for (let i = LENGTH - 1; i >= 0; i--)
    {
        for (let j = 0; j < i; j++)
        {
            fracs.push({
                up: arr[j],
                down: arr[i],
                reversedValue: arr[i] / arr[j]
            });
        }
    }
    fracs.sort((fracA, fracB) => fracB.reversedValue - fracA.reversedValue);

    const {up, down} = fracs[k - 1];

    return [up, down];
};
// @lc code=end

kthSmallestPrimeFraction([1, 2, 3, 5], 3);
