/*
 * @lc app=leetcode id=2140 lang=cpp
 *
 * [2140] Solving Questions With Brainpower
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  long long mostPoints(const std::vector<std::vector<int>>& questions) {
    std::vector<long long> dp(questions.size());
    dp[questions.size() - 1] = questions[questions.size() - 1][kPointsIndex];

    for (int i = static_cast<int>(questions.size()) - 2; i >= 0; i--) {
      const int next_question_index_if_solve =
          i + questions[i][kBrainPowerIndex] + 1;
      dp[i] = std::max(questions[i][kPointsIndex] +
                           (next_question_index_if_solve < questions.size()
                                ? dp[next_question_index_if_solve]
                                : 0),
                       dp[i + 1]);
    }

    return dp[0];
  }

 private:
  constexpr static int kPointsIndex = 0;
  constexpr static int kBrainPowerIndex = 1;
};
// @lc code=end
