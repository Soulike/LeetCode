/*
 * @lc app=leetcode id=823 lang=javascript
 *
 * [823] Binary Trees With Factors
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
const numFactoredBinaryTrees = function (arr)
{
    const LENGTH = arr.length;
    arr.sort((a, b) => a - b);
    const numberSet = new Set(arr);
    /** @type {Map<number, number>} */
    const numberToBinaryTreeCount = new Map();
    for (let i = 0; i < LENGTH; i++)
    {
        const rootNumber = arr[i];
        numberToBinaryTreeCount.set(rootNumber, 1);
        for (let j = 0; j < i; j++)
        {
            const leafNumber = arr[j];
            const anotherLeafNumber = rootNumber / leafNumber;
            if (Number.isInteger(anotherLeafNumber) && numberSet.has(anotherLeafNumber))
            {
                const count = numberToBinaryTreeCount.get(leafNumber) * numberToBinaryTreeCount.get(anotherLeafNumber);
                numberToBinaryTreeCount.set(rootNumber,
                numberToBinaryTreeCount.get(rootNumber) + count);
            }
        }
    }
    const binaryTreeCount = Array.from(numberToBinaryTreeCount.values()).reduce((prev, curr) => (prev + curr)%(10**9+7));
    return binaryTreeCount;
};
// @lc code=end