/*
 * @lc app=leetcode id=1014 lang=cpp
 *
 * [1014] Best Sightseeing Pair
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int maxScoreSightseeingPair(const std::vector<int>& values) {
    /**
     * if `i < j`, the score
     * = `values[i] + values[j] - (j - i)`
     * = `values[i] + values[j] - j + i`
     * = `(values[i] + i) + (values[j] - j)`
     * We call `(values[i] + i)` as "left value",
     * and `(values[j] - j)` as right value.
     * So, given `j`, we should find maximum left value where `i < j`.
     */

    // maxLeftValueBeforeIndex[j] the maximum left value where `i<j`
    // DP: maxLeftValueBeforeIndex[j] = std::max(maxLeftValueBeforeIndex[j - 1],
    // values[j - 1] + (j - 1));
    std::vector<int> maxLeftValueBeforeIndex(values.size(), INT_MIN);
    // `j = 0` is not a valid index since `j >= 1`
    for (int j = 1; j < values.size(); j++) {
      maxLeftValueBeforeIndex[j] =
          std::max(maxLeftValueBeforeIndex[j - 1], values[j - 1] + (j - 1));
    }

    int maximumScore = INT_MIN;
    for (int j = 1; j < values.size(); j++) {
      maximumScore =
          std::max(maximumScore, maxLeftValueBeforeIndex[j] + (values[j] - j));
    }

    return maximumScore;
  }
};
// @lc code=end
