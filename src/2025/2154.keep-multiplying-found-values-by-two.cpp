/*
 * @lc app=leetcode id=2154 lang=cpp
 *
 * [2154] Keep Multiplying Found Values by Two
 */

#include <algorithm>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int findFinalValue(std::vector<int>& nums, int original) {
    std::ranges::sort(nums);

    while (true) {
      if (BinarySearch(nums, original)) {
        original *= 2;
      } else {
        return original;
      }
    }
  }

 private:
  bool BinarySearch(const std::vector<int>& nums, const int target) {
    int left = 0;
    int right = nums.size();

    while (left < right) {
      const int mid = (right - left) / 2 + left;
      if (nums[mid] < target) {
        left = mid + 1;
      } else if (nums[mid] > target) {
        right = mid;
      } else {
        return true;
      }
    }

    return false;
  }
};
// @lc code=end
