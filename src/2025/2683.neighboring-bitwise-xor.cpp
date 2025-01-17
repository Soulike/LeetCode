/*
 * @lc app=leetcode id=2683 lang=cpp
 *
 * [2683] Neighboring Bitwise XOR
 */

#include <vector>
// @lc code=start
class Solution {
 public:
  bool doesValidArrayExist(const std::vector<int>& derived) {
    constexpr bool kFirstOriginalElement = false;

    bool currentOriginalElement = kFirstOriginalElement;
    for (int i = 0; i < derived.size() - 1; i++) {
      if (derived[i] == 1) {
        currentOriginalElement = !currentOriginalElement;
      }
    }

    const bool expectedFirstElement =
        derived.back() == 1 ? !currentOriginalElement : currentOriginalElement;
    return expectedFirstElement == kFirstOriginalElement;
  }
};
// @lc code=end
