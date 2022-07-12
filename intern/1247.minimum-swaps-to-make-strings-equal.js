/*
 * @lc app=leetcode id=1247 lang=javascript
 *
 * [1247] Minimum Swaps to Make Strings Equal
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumSwap = function (s1, s2) {
    /**
     * 情况 1
     * x -> y
     * x -> y
     * 或者
     * y -> x
     * y -> x
     * 那么需要替换 1 次
     *
     * 情况 2
     * x -> y
     * y -> x
     * 那么需要替换 2 次
     *
     * 所以，查看 x -> y 和 y -> x 的个数，
     * 成对的直接去掉+1，不成对的查看能否配对成情况 2
     */
    const n = s1.length;
    let xToY = 0;
    let yToX = 0;

    for (let i = 0; i < n; i++) {
        if (s1[i] === 'x' && s2[i] === 'y') {
            xToY++;
        } else if (s1[i] === 'y' && s2[i] === 'x') {
            yToX++;
        }
    }

    // 无法为情况 2 配对
    if (xToY % 2 !== yToX % 2) {
        return -1;
    } else {
        return (
            Math.floor(xToY / 2) +
            Math.floor(yToX / 2) + // 情况 1
            (xToY % 2) * 2
        ); // 情况 2
    }
};
// @lc code=end
