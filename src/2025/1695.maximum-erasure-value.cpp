/*
 * @lc app=leetcode id=1695 lang=cpp
 *
 * [1695] Maximum Erasure Value
 */

#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maximumUniqueSubarray(const std::vector<int>& nums) {
    std::unordered_set<int> unique_nums;
    int subarray_sum = 0;
    int max_subarray_sum = 0;

    int left = 0;
    int right = 0;
    while (right < nums.size()) {
      while (left < right && unique_nums.contains(nums[right])) {
        unique_nums.erase(nums[left]);
        subarray_sum -= nums[left];
        left++;
      }
      subarray_sum += nums[right];
      unique_nums.insert(nums[right]);
      max_subarray_sum = std::max(max_subarray_sum, subarray_sum);
      right++;
    }

    return max_subarray_sum;
  }
};
// @lc code=end
