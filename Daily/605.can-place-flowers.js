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
    const UNPLANTED = 0;
    const PLANTED = 1;

    let canPlant = false;
    let leftFlowerNumber = n;

    /**
     * @param {number} plantIndex
     * @returns {void}
     */
    const backtrack = (plantIndex) => {
        if (leftFlowerNumber === 0) {
            canPlant = true;
            return;
        }
        if (plantIndex >= flowerbed.length) {
            return;
        }

        if (flowerbed[plantIndex] === PLANTED) {
            backtrack(plantIndex + 2);
            if (canPlant) return;
        } else {
            if (
                plantIndex === flowerbed.length - 1 ||
                flowerbed[plantIndex + 1] !== PLANTED
            ) {
                leftFlowerNumber--;
                flowerbed[plantIndex] = PLANTED;
                backtrack(plantIndex + 2);
                if (canPlant) return;

                flowerbed[plantIndex] = UNPLANTED;
                leftFlowerNumber++;
            } else {
                backtrack(plantIndex + 3);
                if (canPlant) return;
            }
        }
    };

    backtrack(0);
    return canPlant;
};
// @lc code=end
