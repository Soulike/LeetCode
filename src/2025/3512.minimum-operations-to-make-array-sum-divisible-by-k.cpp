/*
 * @lc app=leetcode id=3512 lang=cpp
 *
 * [3512] Minimum Operations to Make Array Sum Divisible by K
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int minOperations(const std::vector<int>& nums, const int k) {
    int remainder = 0;
    for (const int num : nums) {
      remainder += num % k;
      remainder %= k;
    }
    return remainder;
  }
};
// @lc code=end
