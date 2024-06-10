/*
 * @lc app=leetcode id=1051 lang=cpp
 *
 * [1051] Height Checker
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int heightChecker(std::vector<int>& heights) {
    const int N = heights.size();
    std::vector<int> expected = heights;
    std::sort(expected.begin(), expected.end());
    int result = 0;
    for (int i = 0; i < N; i++) {
      if (heights[i] != expected[i]) {
        result++;
      }
    }
    return result;
  }
};
// @lc code=end
