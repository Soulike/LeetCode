/*
 * @lc app=leetcode id=2206 lang=cpp
 *
 * [2206] Divide Array Into Equal Pairs
 */

#include <bitset>
#include <vector>

// @lc code=start
class Solution {
 public:
  bool divideArray(const std::vector<int>& nums) {
    std::bitset<500> bitset;
    for (const auto& num : nums) {
      bitset.flip(num - 1);
    }

    return bitset.none();
  }
};
// @lc code=end
