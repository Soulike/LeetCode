/*
 * @lc app=leetcode id=2529 lang=cpp
 *
 * [2529] Maximum Count of Positive Integer and Negative Integer
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int maximumCount(const std::vector<int>& nums) {
    const int negativeUpperBound = binarySearchLessThanUpperBound(0, nums);
    const int positiveLowerBound = binarySearchMoreThanLowerBound(0, nums);

    const int negativeNumberCount = negativeUpperBound + 1;
    const int positiveNumberCount =
        static_cast<int>(nums.size()) - positiveLowerBound;

    return std::max(negativeNumberCount, positiveNumberCount);
  }

 private:
  static int binarySearchLessThanUpperBound(const int target,
                                            const std::vector<int>& nums) {
    int left = 0;
    int right = static_cast<int>(nums.size()) - 1;

    while (left <= right) {
      const int mid = (right - left) / 2 + left;
      if (nums[mid] >= target) {
        right = mid - 1;
      } else if (nums[mid] < target) {
        if (mid == nums.size() - 1 || nums[mid + 1] >= target) {
          return mid;
        }
        left = mid + 1;
      }
    }

    return -1;
  }

  static int binarySearchMoreThanLowerBound(const int target,
                                            const std::vector<int>& nums) {
    int left = 0;
    int right = static_cast<int>(nums.size()) - 1;

    while (left <= right) {
      const int mid = (right - left) / 2 + left;
      if (nums[mid] <= target) {
        left = mid + 1;
      } else if (nums[mid] > target) {
        if (mid == 0 || nums[mid - 1] <= target) {
          return mid;
        }
        right = mid - 1;
      }
    }

    return static_cast<int>(nums.size());
  }
};
// @lc code=end
