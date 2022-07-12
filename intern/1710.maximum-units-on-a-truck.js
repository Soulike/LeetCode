/*
 * @lc app=leetcode id=1710 lang=javascript
 *
 * [1710] Maximum Units on a Truck
 */

// @lc code=start
/**
 * @param {[number, number][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
const maximumUnits = function (boxTypes, truckSize) {
    boxTypes.sort((a, b) => b[1] - a[1]);
    let unitCount = 0;
    for (const [numberOfBoxes, numberOfUnitsPerBox] of boxTypes) {
        if (numberOfBoxes >= truckSize) {
            unitCount += truckSize * numberOfUnitsPerBox;
            truckSize = 0;
        } else {
            unitCount += numberOfUnitsPerBox * numberOfBoxes;
            truckSize -= numberOfBoxes;
        }

        if (truckSize === 0) {
            break;
        }
    }

    return unitCount;
};
// @lc code=end
