/*
 * @lc app=leetcode id=2028 lang=cpp
 *
 * [2028] Find Missing Observations
 */
#include <cinttypes>
#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> missingRolls(std::vector<int>& rolls, int mean, int n) {
    const int m = rolls.size();
    const int mSum = std::accumulate(rolls.cbegin(), rolls.cend(), 0);
    const int nSum = (m + n) * mean - mSum;

    const double nMean = static_cast<double>(nSum) / n;
    if (nMean > 6 || nMean < 1) {
      return {};
    }

    const int intNMean = static_cast<int>(nMean);
    const int nLeft = static_cast<int>(nSum - intNMean * n);
    std::vector<int> result(n, intNMean);
    std::fill_n(result.begin(), nLeft, intNMean + 1);

    return result;
  }
};
// @lc code=end
