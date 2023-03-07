/*
 * @lc app=leetcode id=2187 lang=javascript
 *
 * [2187] Minimum Time to Complete Trips
 */

// @lc code=start
/**
 * @param {number[]} busTimes
 * @param {number} totalTrips
 * @return {number}
 */
var minimumTime = function (busTimes, totalTrips) {
    /**
     * @param {number} time
     * @returns {number}
     */
    const getTotalTripsAtTime = (time) => {
        let totalTripsAtTime = 0;
        for (const busTime of busTimes) {
            totalTripsAtTime += Math.floor(time / busTime);
        }
        return totalTripsAtTime;
    };

    const BUS_NUMBER = busTimes.length;

    let leftTime = 1;
    let rightTime = Math.ceil((totalTrips * 10 ** 7) / BUS_NUMBER);

    while (leftTime < rightTime) {
        const midTime = Math.floor((rightTime - leftTime) / 2) + leftTime;
        const midTotalTrips = getTotalTripsAtTime(midTime);

        if (midTotalTrips >= totalTrips) {
            rightTime = midTime;
        } else {
            leftTime = midTime + 1;
        }
    }

    return rightTime;
};
// @lc code=end
