/*
 * @lc app=leetcode id=198 lang=cpp
 *
 * [198] House Robber
 */
#include <algorithm>
#include <vector>
using std::max;
using std::vector;
// @lc code=start
class Solution {
 public:
  int rob(vector<int>& nums) {
    int N = nums.size();
    vector<vector<int>> dp(2, vector<int>(2));
    const int NOT_ROB = 0;
    const int ROB = 1;

    dp[0][NOT_ROB] = 0;
    dp[0][ROB] = nums[0];

    for (int i = 1; i < N; i++) {
      dp[i % 2][NOT_ROB] = max(dp[(i - 1) % 2][ROB], dp[(i - 1) % 2][NOT_ROB]);
      dp[i % 2][ROB] = dp[(i - 1) % 2][NOT_ROB] + nums[i];
    }

    return max(dp[(N - 1) % 2][ROB], dp[(N - 1) % 2][NOT_ROB]);
  }
};
// @lc code=end
