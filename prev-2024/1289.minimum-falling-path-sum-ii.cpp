/*
 * @lc app=leetcode id=1289 lang=cpp
 *
 * [1289] Minimum Falling Path Sum II
 */
#include <climits>
#include <cmath>
#include <queue>
#include <utility>
#include <vector>

using std::pair;
using std::priority_queue;
using std::vector;

// @lc code=start
class Solution {
 public:
  int minFallingPathSum(vector<vector<int>>& grid) {
    const int N = grid.size();
    vector<vector<int>> dp(2);
    for (int i = 0; i < 2; i++) {
      dp[i].resize(N);
    }
    dp[0] = grid[0];

    for (int i = 1; i < N; i++) {
      auto lastDpRowMinTwoCols = findMinTwoNumsIndexes(dp[(i - 1) % 2]);
      for (int j = 0; j < N; j++) {
        dp[i % 2][j] = dp[(i - 1) % 2][lastDpRowMinTwoCols.first == j
                                           ? lastDpRowMinTwoCols.second
                                           : lastDpRowMinTwoCols.first] +
                       grid[i][j];
      }
    }

    return *std::min_element(dp[(N - 1) % 2].cbegin(), dp[(N - 1) % 2].cend());
  }

 private:
  pair<int, int> findMinTwoNumsIndexes(const vector<int>& nums) {
    int minIndex = -1;
    int secondMinIndex = -1;

    for (int i = 0; i < nums.size(); i++) {
      if (minIndex == -1 || nums[i] < nums[minIndex]) {
        secondMinIndex = minIndex;
        minIndex = i;
      } else if (secondMinIndex == -1 || nums[i] < nums[secondMinIndex]) {
        secondMinIndex = i;
      }
    }

    return {minIndex, secondMinIndex};
  };
};
// @lc code=end

int main() {
  Solution sol;
  vector<vector<int>> vec = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
  sol.minFallingPathSum(vec);
}