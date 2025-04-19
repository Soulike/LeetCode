/*
 * @lc app=leetcode id=2563 lang=cpp
 *
 * [2563] Count the Number of Fair Pairs
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long countFairPairs(std::vector<int>& nums,
                           const int lower,
                           const int upper) {
    std::ranges::sort(nums);
    size_t pair_number = 0;
    for (size_t i = 0; i < nums.size(); i++) {
      const int current_lower = lower - nums[i];
      const int current_upper = upper - nums[i];
      if (current_lower > nums.back()) {
        continue;
      }
      if (current_upper < nums.front()) {
        break;
      }

      // All nums in [max(lower_bound_index, i + 1), upper_bound_index) can form
      // fair pair with nums[i]
      const size_t lower_bound_index =
          std::max(i + 1, FindLowerBoundIndex(nums, current_lower));
      const size_t upper_bound_index = FindUpperBoundIndex(nums, current_upper);
      if (lower_bound_index >= upper_bound_index) {
        continue;
      }
      pair_number += upper_bound_index - lower_bound_index;
    }

    return static_cast<long long>(pair_number);
  }

 private:
  static size_t FindLowerBoundIndex(const std::vector<int>& nums,
                                    const int target) {
    size_t left = 0;
    size_t right = nums.size();

    while (left < right) {
      const size_t mid = (right - left) / 2 + left;
      if (nums[mid] < target) {
        left = mid + 1;
      } else if (nums[mid] >= target) {
        right = mid;
      }
    }

    return left;
  }

  static size_t FindUpperBoundIndex(const std::vector<int>& nums,
                                    const int target) {
    size_t left = 0;
    size_t right = nums.size();

    while (left < right) {
      const size_t mid = (right - left) / 2 + left;
      if (nums[mid] <= target) {
        left = mid + 1;
      } else if (nums[mid] > target) {
        right = mid;
      }
    }

    return left;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<int> nums = {0, 1, 7, 4, 4, 5};
  sol.countFairPairs(nums, 3, 6);
}
