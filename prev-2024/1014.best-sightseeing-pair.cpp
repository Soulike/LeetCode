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
     * and `(values[j] - j)` as "right value".
     * So, given left value, we should find maximum left value.
     */

    /**
     * maxLeftValueBeforeIndex[j] the maximum left value where `i < j`
     *
     * Dynamic programming:
     * maxLeftValueBeforeIndex[j] =
     * std::max(maxLeftValueBeforeIndex[j - 1] + values[j - 1] + (j - 1));
     *
     * Since only one max left value is needed every calculation,
     * we can optimize memory.
     */
    int maxLeftValueBefore = INT_MIN;

    int maximumScore = INT_MIN;
    // `j = 0` is not a valid index since `j > i > 0`
    for (int j = 1; j < values.size(); j++) {
      maxLeftValueBefore =
          std::max(maxLeftValueBefore, values[j - 1] + (j - 1));
      maximumScore =
          std::max(maximumScore, maxLeftValueBefore + (values[j] - j));
    }

    return maximumScore;
  }
};
// @lc code=end
