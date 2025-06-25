/*
 * @lc app=leetcode id=2040 lang=cpp
 *
 * [2040] Kth Smallest Product of Two Sorted Arrays
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  long long kthSmallestProduct(const std::vector<int>& nums1,
                               const std::vector<int>& nums2,
                               const long long k) {
    long long left = -1e10;
    long long right = 1e10 + 1;

    // Binary search lower bound
    while (left < right) {
      const auto mid = (right - left) / 2 + left;
      const size_t product_count =
          GetProductCountLessOrEqualToMaxProduct(nums1, nums2, mid);
      if (product_count > k) {
        right = mid;
      } else if (product_count < k) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }

 private:
  static size_t GetProductCountLessOrEqualToMaxProduct(
      const std::vector<int>& nums1,
      const std::vector<int>& nums2,
      const long long max_product) {
    size_t count = 0;
    for (const int num : nums1) {
      count += GetElementCountWithMaxProduct(nums2, num, max_product);
    }
    return count;
  }

  // How many elements in `nums` times `num` is less or equal to `max_product`
  // `nums` must be sorted in ascent order.
  static size_t GetElementCountWithMaxProduct(const std::vector<int>& nums,
                                              const int num,
                                              const long long max_product) {
    size_t left = 0;
    size_t right = nums.size();

    while (left < right) {
      const size_t mid = (right - left) / 2 + left;
      const long long product = static_cast<long long>(num) * nums[mid];
      if (num > 0) {
        // Binary search upper bound
        if (product < max_product) {
          left = mid + 1;
        } else if (product > max_product) {
          right = mid;
        } else {
          left = mid + 1;
        }
      } else {
        // Binary search lower bound
        if (product < max_product) {
          right = mid;
        } else if (product > max_product) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
    }

    return num > 0 ? left : nums.size() - left;
  }
};
// @lc code=end
