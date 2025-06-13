/*
 * @lc app=leetcode id=2616 lang=cpp
 *
 * [2616] Minimize the Maximum Difference of Pairs
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimizeMax(std::vector<int>& nums, const int p) {
    if (p == 0) {
      return 0;
    }
    std::ranges::sort(nums);

    int left = 0;
    int right = nums.back() - nums.front();

    while (left < right) {
      const int mid = left + (right - left) / 2;
      const int pair_count = GetPairCountWithMaximumDiff(nums, mid);
      if (pair_count < p) {
        left = mid + 1;
      } else if (pair_count >= p) {
        right = mid;
      }
    }

    return left;
  }

 private:
  static int GetPairCountWithMaximumDiff(const std::vector<int>& nums,
                                         const int maximum_diff) {
    int current_pair_number = 0;
    int index = 0;

    while (index < nums.size() - 1) {
      if (nums[index + 1] - nums[index] > maximum_diff) {
        index++;
      } else {
        current_pair_number++;
        index += 2;
      }
    }

    return current_pair_number;
  }
};
// @lc code=end
