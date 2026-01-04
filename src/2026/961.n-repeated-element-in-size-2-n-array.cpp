/*
 * @lc app=leetcode id=961 lang=cpp
 *
 * [961] N-Repeated Element in Size 2N Array
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int repeatedNTimes(std::vector<int>& nums) {
    const size_t n = nums.size() / 2;
    std::ranges::sort(nums);
    return nums[n - 2] == nums[n - 1] ? nums[n - 1] : nums[n];
  }
};
// @lc code=end
