/*
 * @lc app=leetcode id=1509 lang=cpp
 *
 * [1509] Minimum Difference Between Largest and Smallest Value in Three Moves
 */
#include <algorithm>
#include <cmath>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minDifference(std::vector<int>& nums) {
    if (nums.size() <= 4) {
      return 0;
    }
    std::sort(nums.begin(), nums.end());

    return std::min({
        nums[nums.size() - 4] - nums[0],  // Change the biggest 3
        nums[nums.size() - 3] - nums[1],  // Change the biggest 2 and smallest 1
        nums[nums.size() - 2] - nums[2],  // Change the biggest 1 and smallest 2
        nums[nums.size() - 1] - nums[3]   // Change the smallest 3
    });
  }
};
// @lc code=end
