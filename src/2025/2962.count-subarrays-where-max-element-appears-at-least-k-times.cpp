/*
 * @lc app=leetcode id=2962 lang=cpp
 *
 * [2962] Count Subarrays Where Max Element Appears at Least K Times
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  long long countSubarrays(const std::vector<int>& nums, const int k) {
    const int max_element = *std::max_element(nums.cbegin(), nums.cend());
    int max_element_count = 0;
    int left = 0;
    int right = 0;
    long long subarray_count = 0;
    while (right < nums.size()) {
      max_element_count += nums[right] == max_element;
      right++;
      while (max_element_count >= k) {
        subarray_count += static_cast<long long>(nums.size()) - right + 1;
        max_element_count -= nums[left] == max_element;
        left++;
      }
    }

    return subarray_count;
  }
};
// @lc code=end
