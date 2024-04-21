/*
 * @lc app=leetcode id=1716 lang=javascript
 *
 * [1716] Calculate Money in Leetcode Bank
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var totalMoney = function (n) {
  const wholeWeeksNumber = Math.floor(n / 7);
  let moneySum =
    wholeWeeksNumber * 28 + (wholeWeeksNumber - 1) * 7 * (wholeWeeksNumber / 2);

  moneySum += getWeekSum(n % 7, wholeWeeksNumber + 1);

  return moneySum;
};

/**
 * @param {number} dayNumber - how many days in the week
 * @param {number} weekNumber - starts from 1
 * @returns {number}
 */
function getWeekSum(dayNumber, weekNumber) {
  const first = weekNumber;
  const last = first + dayNumber - 1;
  return ((first + last) * dayNumber) / 2;
}
// @lc code=end

totalMoney(20);
