/*
 * @lc app=leetcode id=2683 lang=cpp
 *
 * [2683] Neighboring Bitwise XOR
 */

#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  bool doesValidArrayExist(const std::vector<int>& derived) {
    return std::accumulate(derived.cbegin(), derived.cend(), 0,
                           [](const int a, const int b) { return a ^ b; }) == 0;
  }
};
// @lc code=end
