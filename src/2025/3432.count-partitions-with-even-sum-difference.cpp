/*
 * @lc app=leetcode id=3432 lang=cpp
 *
 * [3432] Count Partitions with Even Sum Difference
 */

#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  int countPartitions(const std::vector<int>& nums) {
    const int sum = std::accumulate(nums.cbegin(), nums.cend(), 0);
    int left_sum = 0;
    int result = 0;
    for (int i = 0; i < nums.size() - 1; i++) {
      left_sum += nums[i];
      const int right_sum = sum - left_sum;
      const int diff = std::abs(right_sum - left_sum);
      result += diff % 2 == 0;
    }
    return result;
  }
};
// @lc code=end
