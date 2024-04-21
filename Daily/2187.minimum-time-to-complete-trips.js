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
  const MAX_BUS_TIME = Math.max(...busTimes);

  let leftTime = 1;
  /*
    Worst case: all bus times are MAX_BUS_TIME, we need the minimum time n fulfilling
        Math.floor(n / MAX_BUS_TIME) * BUS_NUMBER >= totalTrips
    =>  Math.floor(n / MAX_BUS_TIME) >= totalTrips / BUS_NUMBER
    =>  n / MAX_BUS_TIME >= Math.ceil(totalTrips / BUS_NUMBER)
    =>  n >= Math.ceil(totalTrips / BUS_NUMBER) * MAX_BUS_TIME
    */
  let rightTime = MAX_BUS_TIME * Math.ceil(totalTrips / BUS_NUMBER);

  // find right border
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

minimumTime([9, 7, 10, 9, 10, 9, 10], 1);
