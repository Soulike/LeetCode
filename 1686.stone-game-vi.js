/*
 * @lc app=leetcode id=1686 lang=javascript
 *
 * [1686] Stone Game VI
 */

// @lc code=start
/**
 * @param {number[]} aliceValues
 * @param {number[]} bobValues
 * @return {number}
 */
var stoneGameVI = function (aliceValues, bobValues)
{
    const n = aliceValues.length;
    const values = new Array(n);
    for (let i = 0; i < n; i++)
    {
        values[i] = [
            aliceValues[i] + bobValues[i],
            aliceValues[i],
            bobValues[i],
        ];
    }

    values.sort((value1, value2) => value2[0] - value1[0]);

    /**
     * 对于每次取石头，都希望对方与自己的差距变大
     * 因此自己收益与对方受损的和要最大
     * aliceValues[i] + bobValues[i] 的和最大
     */

    let aliceCount = 0;
    let bobCount = 0;

    for (let i = 0; i < n; i++)
    {
        if (i % 2 === 0)    // alice
        {
            aliceCount += values[i][1];
        }
        else
        {
            bobCount += values[i][2];
        }
    }

    return aliceCount > bobCount
        ? 1
        : aliceCount === bobCount
            ? 0
            : -1;
};
// @lc code=end