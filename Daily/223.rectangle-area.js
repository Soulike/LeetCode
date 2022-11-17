/*
 * @lc app=leetcode id=223 lang=javascript
 *
 * [223] Rectangle Area
 */

// @lc code=start
/**
 * @param {number} ax1
 * @param {number} ay1
 * @param {number} ax2
 * @param {number} ay2
 * @param {number} bx1
 * @param {number} by1
 * @param {number} bx2
 * @param {number} by2
 * @return {number}
 */
var computeArea = function (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
    /**
     * @param {number} aStart
     * @param {number} aEnd
     * @param {number} bStart
     * @param {number} bEnd
     * @returns {number}
     */
    const calculateOverlapLength = (aStart, aEnd, bStart, bEnd) => {
        if (aEnd < bStart) return 0;
        else if (bStart <= aEnd && aStart <= bStart && aEnd <= bEnd) {
            return aEnd - bStart;
        } else if (aStart <= bStart && bEnd <= aEnd) {
            return bEnd - bStart;
        } else if (bStart <= aStart && aEnd <= bEnd) {
            return aEnd - aStart;
        } else if (bStart <= aStart && aStart <= bEnd && bEnd <= aEnd) {
            return bEnd - aStart;
        }
        // bEnd < aStart
        else {
            return 0;
        }
    };

    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @returns {number}
     */
    const calculateArea = (x1, y1, x2, y2) => {
        return Math.abs(x1 - x2) * Math.abs(y1 - y2);
    };

    const xOverlapLength = calculateOverlapLength(ax1, ax2, bx1, bx2);
    const yOverlapLength = calculateOverlapLength(ay1, ay2, by1, by2);

    const aArea = calculateArea(ax1, ay1, ax2, ay2);
    const bArea = calculateArea(bx1, by1, bx2, by2);
    const overArea = xOverlapLength * yOverlapLength;
    return aArea + bArea - overArea;
};
// @lc code=end
