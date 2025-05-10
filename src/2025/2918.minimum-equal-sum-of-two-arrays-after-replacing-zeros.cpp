/*
 * @lc app=leetcode id=2918 lang=cpp
 *
 * [2918] Minimum Equal Sum of Two Arrays After Replacing Zeros
 */

#include <algorithm>
#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long minSum(const std::vector<int>& nums1,
                   const std::vector<int>& nums2) {
    const long long nums1_sum =
        std::accumulate(nums1.cbegin(), nums1.cend(), 0ll);
    const long long nums2_sum =
        std::accumulate(nums2.cbegin(), nums2.cend(), 0ll);
    const long long nums1_zero_count = std::count_if(
        nums1.cbegin(), nums1.cend(), [](const int num) { return num == 0; });
    const long long nums2_zero_count = std::count_if(
        nums2.cbegin(), nums2.cend(), [](const int num) { return num == 0; });

    if (nums1_sum + nums1_zero_count == nums2_sum + nums2_zero_count) {
      return nums1_sum + nums1_zero_count;
    }

    if (nums1_sum + nums1_zero_count > nums2_sum + nums2_zero_count) {
      if (nums2_zero_count == 0) {
        return -1;
      }
      return nums1_sum + nums1_zero_count;
    }

    if (nums1_sum + nums1_zero_count < nums2_sum + nums2_zero_count) {
      if (nums1_zero_count == 0) {
        return -1;
      }
      return nums2_sum + nums2_zero_count;
    }

    return -1;
  }
};
// @lc code=end
