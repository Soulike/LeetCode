/*
 * @lc app=leetcode id=1937 lang=cpp
 *
 * [1937] Maximum Number of Points with Cost
 */
#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long maxPoints(std::vector<std::vector<int>>& points) {
    const auto ROWS = points.size();
    const auto COLS = points[0].size();

    /*
     * dp[i][j] - The maximum score when points[i][j] is reached
     */
    std::vector<std::vector<long long>> dp(2, std::vector<long long>(COLS));
    /*
     * leftMax[i][j] - How many contributions we can get from points[i-1][0~j]
     * */
    std::vector<std::vector<long long>> leftMax(2,
                                                std::vector<long long>(COLS));
    /*
     * rightMax[i][j] - How many contributions we can get from
     * points[i-1][j~COLS-1]
     * */
    std::vector<std::vector<long long>> rightMax(2,
                                                 std::vector<long long>(COLS));

    // base case
    for (int j = 0; j < COLS; j++) {
      dp[0][j] = leftMax[0][j] = rightMax[0][j] = points[0][j];
    }

    for (int i = 1; i < ROWS; i++) {
      leftMax[i % 2][0] = dp[(i - 1) % 2][0];
      for (int j = 1; j < COLS; j++) {
        // Choose from left ones, or the one above
        leftMax[i % 2][j] =
            std::max(leftMax[i % 2][j - 1] - 1, dp[(i - 1) % 2][j]);
      }

      rightMax[i % 2][COLS - 1] = dp[(i - 1) % 2][COLS - 1];
      for (int j = COLS - 2; j >= 0; j--) {
        // Choose from right ones, or the one above
        rightMax[i % 2][j] =
            std::max(rightMax[i % 2][j + 1] - 1, dp[(i - 1) % 2][j]);
      }

      for (int j = 0; j < COLS; j++) {
        dp[i % 2][j] =
            std::max(leftMax[i % 2][j], rightMax[i % 2][j]) + points[i][j];
      }
    }

    return *std::max_element(dp[(ROWS - 1) % 2].cbegin(),
                             dp[(ROWS - 1) % 2].cend());
  }
};
// @lc code=end
