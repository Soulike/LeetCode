/*
 * @lc app=leetcode id=1601 lang=javascript
 *
 * [1601] Maximum Number of Achievable Transfer Requests
 */

// @lc code=start
/**
 * @param {number} n
 * @param {[from:number, to:number][]} requests
 * @return {number}
 */
var maximumRequests = function (n, requests) {
  let maxReqNum = 0;
  let currentReqNum = 0;

  const buildingPeopleDiff = new Array(n);
  buildingPeopleDiff.fill(0);

  const isNoDiff = () => {
    for (const diff of buildingPeopleDiff) {
      if (diff !== 0) return false;
    }
    return true;
  };

  /**
   * @param {number} requestIndex
   * @returns {void}
   */
  const backtrack = (requestIndex) => {
    if (isNoDiff()) {
      maxReqNum = Math.max(maxReqNum, currentReqNum);
    }

    for (let i = requestIndex; i < requests.length; i++) {
      const [from, to] = requests[i];

      buildingPeopleDiff[from] -= 1;
      buildingPeopleDiff[to] += 1;
      currentReqNum++;

      backtrack(i + 1);

      currentReqNum--;
      buildingPeopleDiff[to] -= 1;
      buildingPeopleDiff[from] += 1;
    }
  };

  for (let i = 0; i < requests.length; i++) {
    backtrack(i);
  }

  return maxReqNum;
};
// @lc code=end
