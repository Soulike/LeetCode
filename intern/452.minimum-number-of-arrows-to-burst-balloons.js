/*
 * @lc app=leetcode id=452 lang=javascript
 *
 * [452] Minimum Number of Arrows to Burst Balloons
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
const findMinArrowShots = function (points) {
    if (points.length < 2) {
        return points.length;
    }
    /**
     * 问题可以转化为，找到最多的不重合区间 => 删掉最少的区间以让区间不重合
     */
    points.sort(([, end1], [, end2]) => end1 - end2);

    let leftIntervalIndex = 0;
    let rightIntervalIndex = 1;
    let removeCount = 0;

    while (rightIntervalIndex < points.length) {
        const [, leftEnd] = points[leftIntervalIndex];
        const [rightStart] = points[rightIntervalIndex];
        if (leftEnd >= rightStart) {
            removeCount++;
            rightIntervalIndex++;
        } else {
            leftIntervalIndex = rightIntervalIndex;
            rightIntervalIndex = leftIntervalIndex + 1;
        }
    }

    return points.length - removeCount;
};
// @lc code=end
