/*
 * @lc app=leetcode id=605 lang=javascript
 *
 * [605] Can Place Flowers
 */

// @lc code=start
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
    if (n === 0) {
        return true;
    }

    const LENGTH = flowerbed.length;

    for (let i = 0; i < LENGTH; i++) {
        if (flowerbed[i] === 0) {
            if (
                (i - 1 < 0 || flowerbed[i - 1] === 0) &&
                (i + 1 > LENGTH - 1 || flowerbed[i + 1] === 0)
            ) {
                flowerbed[i] = 1;
                n--;

                if (n === 0) {
                    return true;
                }
            }
        }
    }

    return false;
};
// @lc code=end
