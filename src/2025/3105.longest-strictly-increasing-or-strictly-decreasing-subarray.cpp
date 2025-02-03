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
    int increasingSubArrayLength = 1;
    int decreasingSubArrayLength = 1;

    int maxMonotonicSubArrayLength = 1;

    for (int i = 1; i < nums.size(); i++) {
      if (nums[i - 1] > nums[i]) {
        decreasingSubArrayLength++;
      } else {
        decreasingSubArrayLength = 1;
      }

      if (nums[i - 1] < nums[i]) {
        increasingSubArrayLength++;
      } else {
        increasingSubArrayLength = 1;
      }

      maxMonotonicSubArrayLength =
          std::max({maxMonotonicSubArrayLength, increasingSubArrayLength,
                    decreasingSubArrayLength});
    }

    return maxMonotonicSubArrayLength;
  }
};
// @lc code=end
