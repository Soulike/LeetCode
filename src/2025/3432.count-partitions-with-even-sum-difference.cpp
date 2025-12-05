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
    return sum % 2 == 0 ? nums.size() - 1 : 0;
  }
};
// @lc code=end
