/*
 * @lc app=leetcode id=455 lang=javascript
 *
 * [455] Assign Cookies
 */

// @lc code=start
/**
 * @param {number[]} childGreeds
 * @param {number[]} cookieSizes
 * @return {number}
 */
var findContentChildren = function (childGreeds, cookieSizes) {
    childGreeds.sort((a, b) => a - b);
    cookieSizes.sort((a, b) => a - b);

    let child = 0;
    let cookie = 0;

    let contentChildrenNumber = 0;

    while (cookie < cookieSizes.length && child < childGreeds.length) {
        if (childGreeds[child] <= cookieSizes[cookie]) {
            contentChildrenNumber++;
            child++;
            cookie++;
        } else {
            cookie++;
        }
    }

    return contentChildrenNumber;
};
// @lc code=end
