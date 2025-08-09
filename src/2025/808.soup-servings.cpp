/*
 * @lc app=leetcode id=808 lang=cpp
 *
 * [808] Soup Servings
 */

#include <algorithm>
#include <cmath>
#include <functional>
#include <vector>

// @lc code=start
class Solution {
 public:
  double soupServings(const int n) {
    if (n > 5000) {
      return 1.0;
    }

    const int total_serve_count = static_cast<int>(std::ceil(n / 25.0));

    return GetProbability(total_serve_count);
  }

 private:
  static double GetProbability(const int serve_count) {
    std::vector<std::vector<double>> probabilities(
        serve_count + 1, std::vector<double>(serve_count + 1, -1));
    return GetProbabilityHelper(serve_count, serve_count, probabilities);
  }

  static double GetProbabilityHelper(const int a_serve_count,
                                     const int b_serve_count,
                                     std::vector<std::vector<double>>& memo) {
    if (a_serve_count <= 0 && b_serve_count <= 0) {
      return 0.5;
    }
    if (a_serve_count <= 0) {
      return 1.0;
    }
    if (b_serve_count <= 0) {
      return 0.0;
    }
    if (memo[a_serve_count][b_serve_count] != -1) {
      return memo[a_serve_count][b_serve_count];
    }

    const double result =
        0.25 *
        (GetProbabilityHelper(a_serve_count - 4, b_serve_count, memo) +
         GetProbabilityHelper(a_serve_count - 3, b_serve_count - 1, memo) +
         GetProbabilityHelper(a_serve_count - 2, b_serve_count - 2, memo) +
         GetProbabilityHelper(a_serve_count - 1, b_serve_count - 3, memo));
    memo[a_serve_count][b_serve_count] = result;
    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.soupServings(0);
}
