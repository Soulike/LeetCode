/*
 * @lc app=leetcode id=1800 lang=cpp
 *
 * [1800] Maximum Ascending Subarray Sum
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int maxAscendingSum(const std::vector<int>& nums) {
    int currentAscendingSum = nums[0];
    int maximumAscendingSum = currentAscendingSum;
    for (int i = 1; i < nums.size(); i++) {
      if (nums[i - 1] >= nums[i]) {
        maximumAscendingSum =
            std::max(maximumAscendingSum, currentAscendingSum);
        currentAscendingSum = 0;
      }
      currentAscendingSum += nums[i];
    }

    maximumAscendingSum = std::max(maximumAscendingSum, currentAscendingSum);
    return maximumAscendingSum;
  }
};
// @lc code=end
