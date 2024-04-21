/*
 * @lc app=leetcode id=1599 lang=javascript
 *
 * [1599] Maximum Profit of Operating a Centennial Wheel
 */

// @lc code=start
/**
 * @param {number[]} customers
 * @param {number} boardingCost
 * @param {number} runningCost
 * @return {number}
 */
const minOperationsMaxProfit = function (customers, boardingCost, runningCost) {
  let currentProfit = 0;
  let maxProfit = 0;
  let currentOperationTime = 0;
  let minOperationTime = 0;
  let waitingCustomerCount = 0;
  let currentCustomerCount = 0;
  do {
    if (currentOperationTime < customers.length) {
      waitingCustomerCount += customers[currentOperationTime];
    }

    if (waitingCustomerCount <= 4) {
      currentCustomerCount = waitingCustomerCount;
      waitingCustomerCount = 0;
    } else {
      currentCustomerCount = 4;
      waitingCustomerCount -= 4;
    }

    currentOperationTime++;
    currentProfit += currentCustomerCount * boardingCost - runningCost;
    if (currentProfit > maxProfit) {
      minOperationTime = currentOperationTime;
      maxProfit = currentProfit;
    }
  } while (waitingCustomerCount > 0 || currentOperationTime < customers.length);

  return maxProfit > 0 ? minOperationTime : -1;
};
// @lc code=end
