/*
 * @lc app=leetcode id=1943 lang=javascript
 *
 * [1943] Describe the Painting
 */

// @lc code=start
/**
 * @param {[number,number,number][]} segments
 * @return {[number,number,number][]}
 */
const splitPainting = function (segments)
{
    let currentPaint = 0;
    /** @type {Map<number, number>} */
    const indexToColorDiff = new Map();

    for (const [start, end, color] of segments)
    {
        indexToColorDiff.set(start,
            (indexToColorDiff.get(start) ?? 0) + color);
        indexToColorDiff.set(end,
            (indexToColorDiff.get(end) ?? 0) - color);
    }

    /** @type {[number,number,number][]} */
    const results = [];
    const indexToColorDiffArray = Array.from(indexToColorDiff).sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < indexToColorDiffArray.length - 1; i++)
    {
        currentPaint += indexToColorDiffArray[i][1];
        if (currentPaint !== 0)
        {
            results.push([indexToColorDiffArray[i][0], indexToColorDiffArray[i + 1][0], currentPaint]);
        }
    }

    return results;
};
// @lc code=end