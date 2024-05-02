/*
 * @lc app=leetcode id=2441 lang=cpp
 *
 * [2441] Largest Positive Integer That Exists With Its Negative
 */

#include <algorithm>
#include <cmath>
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int findMaxK(vector<int>& nums) {
    std::sort(nums.begin(), nums.end());
    int positiveIndex = nums.size() - 1;
    int negativeIndex = 0;

    while (negativeIndex < positiveIndex && nums[negativeIndex] < 0 &&
           nums[positiveIndex] > 0) {
      if (std::abs(nums[negativeIndex]) == nums[positiveIndex]) {
        return nums[positiveIndex];
      } else if (std::abs(nums[negativeIndex]) > nums[positiveIndex]) {
        negativeIndex++;
      } else {
        positiveIndex--;
      }
    }

    return -1;
  }
};
// @lc code=end
