/*
 * @lc app=leetcode id=2294 lang=cpp
 *
 * [2294] Partition Array Such That Maximum Difference Is K
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int partitionArray(std::vector<int>& nums, int k) {
    std::ranges::sort(nums);
    int partitions_number = 1;
    int current_partition_min = nums[0];
    for (int i = 1; i < nums.size(); i++) {
      if (nums[i] - current_partition_min > k) {
        current_partition_min = nums[i];
        partitions_number++;
      }
    }
    return partitions_number;
  }
};
// @lc code=end
