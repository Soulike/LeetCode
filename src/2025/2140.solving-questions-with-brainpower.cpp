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
    return MostPointsFromIndex(questions, 0);
  }

 private:
  constexpr static int kPointsIndex = 0;
  constexpr static int kBrainPowerIndex = 1;
  constexpr static long long kMemoNotExist = -1;

  long long MostPointsFromIndex(const std::vector<std::vector<int>>& questions,
                                const int index) {
    std::vector<long long> memo(questions.size(), kMemoNotExist);
    return MostPointsFromIndexImpl(questions, index, memo);
  }

  long long MostPointsFromIndexImpl(
      const std::vector<std::vector<int>>& questions,
      const int index,
      std::vector<long long>& memo) {
    if (index >= questions.size()) {
      return 0;
    }

    if (memo[index] != kMemoNotExist) {
      return memo[index];
    }

    const long long solve_current_question_points =
        questions[index][kPointsIndex] +
        MostPointsFromIndexImpl(
            questions, index + questions[index][kBrainPowerIndex] + 1, memo);
    const long long skip_current_question_points =
        MostPointsFromIndexImpl(questions, index + 1, memo);
    const long long max_points =
        std::max(solve_current_question_points, skip_current_question_points);
    memo[index] = max_points;
    return max_points;
  }
};
// @lc code=end
