/*
 * @lc app=leetcode id=3718 lang=cpp
 *
 * [3718] Smallest Missing Multiple of K
 */

#include <array>
#include <vector>

// @lc code=start
class Solution {
 public:
  int missingMultiple(const std::vector<int>& nums, const int k) {
    std::array<bool, 101> has_num = {};
    for (const int num : nums) {
      has_num[num] = true;
    }

    for (int i = 1;; i++) {
      if (k * i > 100 || !has_num[k * i]) {
        return k * i;
      }
    }
  }
};
// @lc code=end
