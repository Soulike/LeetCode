/*
 * @lc app=leetcode id=3105 lang=cpp
 *
 * [3105] Longest Strictly Increasing or Strictly Decreasing Subarray
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int longestMonotonicSubarray(const std::vector<int>& nums) {
    std::vector<int> increasingSubArrayLength(nums.size(), 1);
    std::vector<int> decreasingSubArrayLength(nums.size(), 1);

    for (int i = 1; i < nums.size(); i++) {
      if (nums[i - 1] > nums[i]) {
        decreasingSubArrayLength[i] = decreasingSubArrayLength[i - 1] + 1;
      }

      if (nums[i - 1] < nums[i]) {
        increasingSubArrayLength[i] = increasingSubArrayLength[i - 1] + 1;
      }
    }

    const int maxIncreasingSubArrayLength = *std::max_element(
        increasingSubArrayLength.cbegin(), increasingSubArrayLength.cend());
    const int maxDecreasingSubArrayLength = *std::max_element(
        decreasingSubArrayLength.cbegin(), decreasingSubArrayLength.cend());

    return std::max(maxIncreasingSubArrayLength, maxDecreasingSubArrayLength);
  }
};
// @lc code=end
