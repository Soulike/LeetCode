/*
 * @lc app=leetcode id=2125 lang=javascript
 *
 * [2125] Number of Laser Beams in a Bank
 */

// @lc code=start
/**
 * @param {string[]} bank
 * @return {number}
 */
var numberOfBeams = function (bank) {
  let lastRowDeviceCount = 0;
  let beamCount = 0;

  for (let i = 0; i < bank.length; i++) {
    let currentRowDeviceCount = 0;
    for (let j = 0; j < bank[i].length; j++) {
      if (bank[i][j] === '1') currentRowDeviceCount++;
    }
    if (currentRowDeviceCount !== 0) {
      beamCount += currentRowDeviceCount * lastRowDeviceCount;
      lastRowDeviceCount = currentRowDeviceCount;
    }
  }

  return beamCount;
};
// @lc code=end
