/*
 * @lc app=leetcode id=717 lang=cpp
 *
 * [717] 1-bit and 2-bit Characters
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  bool isOneBitCharacter(const std::vector<int>& bits) {
    size_t current_index = 0;
    while (current_index < bits.size() - 1) {
      current_index += bits[current_index] + 1;
    }

    return current_index == bits.size() - 1;
  }
};
// @lc code=end
