/*
 * @lc app=leetcode id=135 lang=javascript
 *
 * [135] Candy
 */

// @lc code=start
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  const N = ratings.length;
  const candies = new Array(N);
  candies.fill(1);

  for (let i = 1; i < N; i++) {
    if (ratings[i - 1] < ratings[i]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  for (let i = N - 1; i > 0; i--) {
    if (ratings[i - 1] > ratings[i]) {
      candies[i - 1] = Math.max(candies[i] + 1, candies[i - 1]);
    }
  }

  return candies.reduce((prev, curr) => prev + curr);
};
// @lc code=end
