/*
 * @lc app=leetcode id=3075 lang=cpp
 *
 * [3075] Maximize Happiness of Selected Children
 */
#include <algorithm>
#include <cmath>
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  long long maximumHappinessSum(vector<int>& happiness, int k) {
    std::sort(happiness.begin(), happiness.end(),
              [](int a, int b) { return a > b; });
    long long sum = 0;
    for (int i = 0; i < k; i++) {
      sum += std::max(0, happiness[i] - i);
    }
    return sum;
  }
};
// @lc code=end
