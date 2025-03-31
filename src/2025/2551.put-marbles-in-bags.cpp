/*
 * @lc app=leetcode id=2551 lang=cpp
 *
 * [2551] Put Marbles in Bags
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long putMarbles(const std::vector<int>& weights, const int k) {
    std::vector<int> weightPairSums(weights.size() - 1, -1);
    for (int i = 0; i < weights.size() - 1; i++) {
      weightPairSums[i] = weights[i] + weights[i + 1];
    }
    std::sort(weightPairSums.begin(), weightPairSums.end());

    long long result = 0;
    for (int i = 0; i < k - 1; i++) {
      result +=
          weightPairSums[weightPairSums.size() - i - 1] - weightPairSums[i];
    }
    return result;
  }
};
// @lc code=end
