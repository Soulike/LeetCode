/*
 * @lc app=leetcode id=2483 lang=javascript
 *
 * [2483] Minimum Penalty for a Shop
 */

// @lc code=start
/**
 * @param {string} customers
 * @return {number}
 */
var bestClosingTime = function (customers) {
  const CUSTOMERS = 'Y';
  const NO_CUSTOMERS = 'N';

  // At the beginning, the shop closes at 0th hour.

  // The penalty of closing the shop at 0th hour.
  // Since we don't need the actual penalty, initialize currentPenalty to any value is ok.
  let currentPenalty = 0;

  let minPenalty = 0;
  let minPenaltyCloseHour = 0;

  // At (i)th hour, the shop is open, and will close at (i+1)th hour
  for (let i = 0; i < customers.length; i++) {
    if (customers[i] === CUSTOMERS) {
      currentPenalty -= 1;
    } else {
      currentPenalty += 1;
    }

    if (currentPenalty < minPenalty) {
      minPenalty = currentPenalty;
      minPenaltyCloseHour = i + 1;
    }
  }

  return minPenaltyCloseHour;
};
// @lc code=end

bestClosingTime('NNNN');
