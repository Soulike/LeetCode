/*
 * @lc app=leetcode id=1984 lang=cpp
 *
 * [1984] Minimum Difference Between Highest and Lowest of K Scores
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumDifference(std::vector<int>& nums, const int k) {
    std::ranges::sort(nums);
    int min_diff = INT_MAX;
    for (int i = 0; i + k - 1 < nums.size(); i++) {
      min_diff = std::min(min_diff, nums[i + k - 1] - nums[i]);
    }
    return min_diff;
  }
};
// @lc code=end
