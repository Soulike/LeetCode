/*
 * @lc app=leetcode id=3487 lang=cpp
 *
 * [3487] Maximum Unique Subarray Sum After Deletion
 */

#include <array>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxSum(const std::vector<int>& nums) {
    std::array<bool, 101> seen_nums = {};
    int max_num = INT_MIN;
    int sum = 0;
    for (const int num : nums) {
      max_num = std::max(max_num, num);
      if (num > 0 && !seen_nums[num]) {
        sum += num;
        seen_nums[num] = true;
      }
    }

    if (sum == 0) {
      return max_num;
    }
    return sum;
  }
};
// @lc code=end
