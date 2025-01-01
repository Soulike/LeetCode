/*
 * @lc app=leetcode id=1491 lang=javascript
 *
 * [1491] Average Salary Excluding the Minimum and Maximum Salary
 */

// @lc code=start
/**
 * @param {number[]} salary
 * @return {number}
 */
var average = function (salary) {
  let aveSalary = 0;
  let minSalary = Infinity;
  let maxSalary = -Infinity;
  const N = salary.length;

  for (let i = 0; i < N; i++) {
    aveSalary += salary[i] / (N - 2);
    minSalary = Math.min(minSalary, salary[i]);
    maxSalary = Math.max(maxSalary, salary[i]);
  }

  return aveSalary - (minSalary + maxSalary) / (N - 2);
};
// @lc code=end
