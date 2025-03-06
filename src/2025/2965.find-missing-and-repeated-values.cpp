/*
 * @lc app=leetcode id=2965 lang=cpp
 *
 * [2965] Find Missing and Repeated Values
 */

#include <cinttypes>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> findMissingAndRepeatedValues(
      const std::vector<std::vector<int>>& grid) {
    /**
     * Assume x is missing and y is repeated,
     * then
     * 1. expectedSum - x + y = actualSum
     * 2. expectedSquareSum - x^2 + y^2 = actualSquareSum
     *
     * From 1: x - y = expectedSum - actualSum = sumDiff
     * From 2: x^2 - y^2 = expectedSquareSum - actualSquareSum = squareSumDiff
     *
     * Since x^2 - y^2 = (x + y)(x - y), so
     * x + y = (x^2 - y^2)/(x - y)
     *       = squareSumDiff / sumDiff
     * And we know x - y = sumDiff
     *
     * Therefore,
     * x = (squareSumDiff / sumDiff + sumDiff) / 2
     * y = (squareSumDiff / sumDiff - sumDiff) / 2
     */

    const int N = static_cast<int>(grid.size());

    std::int64_t expectedSum = 0;
    std::int64_t expectedSquareSum = 0;
    std::int64_t actualSum = 0;
    std::int64_t actualSquareSum = 0;

    // Of course, we have math formula to finish the calculation.
    // But use loop is much easier to remember.
    for (int i = 0; i < N; i++) {
      for (int j = 0; j < N; j++) {
        const std::int64_t expectedNum = i * N + j + 1;
        const std::int64_t actualNum = grid[i][j];
        expectedSum += expectedNum;
        expectedSquareSum += expectedNum * expectedNum;
        actualSum += actualNum;
        actualSquareSum += actualNum * actualNum;
      }
    }

    const std::int64_t sumDiff = expectedSum - actualSum;
    const std::int64_t squareSumDiff = expectedSquareSum - actualSquareSum;

    const int x = static_cast<int>(squareSumDiff / sumDiff + sumDiff) / 2;
    const int y = static_cast<int>(squareSumDiff / sumDiff - sumDiff) / 2;

    return {y, x};
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.findMissingAndRepeatedValues({{1, 3}, {2, 2}});
}
