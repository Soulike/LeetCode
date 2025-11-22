/*
 * @lc app=leetcode id=3190 lang=cpp
 *
 * [3190] Find Minimum Operations to Make All Elements Divisible by Three
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumOperations(const std::vector<int>& nums) {
    int operation_count = 0;
    for (const int num : nums) {
      const int remainder = num % 3;
      operation_count += std::min(remainder, 3 - remainder);
    }
    return operation_count;
  }
};
// @lc code=end
