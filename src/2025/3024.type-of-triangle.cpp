/*
 * @lc app=leetcode id=3024 lang=cpp
 *
 * [3024] Type of Triangle
 */

#include <algorithm>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string triangleType(std::vector<int>& nums) {
    std::ranges::sort(nums);
    if (nums[2] >= nums[0] + nums[1]) {
      return "none";
    }

    if (nums[0] == nums[1] && nums[1] == nums[2]) {
      return "equilateral";
    }

    if (nums[0] == nums[1] || nums[1] == nums[2]) {
      return "isosceles";
    }

    return "scalene";
  }
};
// @lc code=end
