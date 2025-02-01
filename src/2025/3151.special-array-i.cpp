/*
 * @lc app=leetcode id=3151 lang=cpp
 *
 * [3151] Special Array I
 */

#include <cinttypes>
#include <vector>

// @lc code=start
class Solution {
 public:
  bool isArraySpecial(const std::vector<int>& nums) {
    std::uint8_t expectedLastBit = nums[0] & 0b1;
    for (int i = 0; i < nums.size(); i++) {
      if ((nums[i] & 0b1) != expectedLastBit) {
        return false;
      }
      expectedLastBit = 1 - expectedLastBit;
    }

    return true;
  }
};
// @lc code=end
