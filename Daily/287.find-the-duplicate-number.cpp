/*
 * @lc app=leetcode id=287 lang=cpp
 *
 * [287] Find the Duplicate Number
 */
#include <cmath>
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int findDuplicate(vector<int>& nums) {
    for (int i = 0; i < nums.size(); i++) {
      int index = std::abs(nums[i]) - 1;
      if (nums[index] < 0) {
        // visited
        return std::abs(nums[i]);
      }
      nums[index] *= -1;
    }
    return 0;
  }
};
// @lc code=end