/*
 * @lc app=leetcode id=1877 lang=cpp
 *
 * [1877] Minimize Maximum Pair Sum in Array
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minPairSum(std::vector<int>& nums) {
    std::ranges::sort(nums);
    int sum = INT_MIN;
    for (int i = 0; i < nums.size() / 2; i++) {
      sum = std::max(sum, nums[i] + nums[nums.size() - i - 1]);
    }
    return sum;
  }
};
// @lc code=end
