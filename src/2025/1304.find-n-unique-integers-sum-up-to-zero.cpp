/*
 * @lc app=leetcode id=1304 lang=cpp
 *
 * [1304] Find N Unique Integers Sum up to Zero
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> sumZero(const int n) {
    std::vector<int> result;
    result.reserve(n);
    const int offset = n / 2;

    for (int i = 1; i <= offset; i++) {
      result.push_back(i);
      result.push_back(-i);
    }

    if (n % 2) {
      result.push_back(0);
    }

    return result;
  }
};
// @lc code=end
