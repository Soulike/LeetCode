/*
 * @lc app=leetcode id=3507 lang=cpp
 *
 * [3507] Minimum Pair Removal to Sort Array I
 */

#include <algorithm>
#include <utility>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumPairRemoval(std::vector<int>& nums) {
    int removal_count = 0;
    size_t nums_valid_size = nums.size();
    while (!std::is_sorted(nums.cbegin(), nums.cbegin() + nums_valid_size)) {
      size_t min_pair_sum_index = 0;
      int min_pair_sum = nums[0] + nums[1];
      for (size_t i = 1; i < nums_valid_size - 1; i++) {
        if (nums[i] + nums[i + 1] < min_pair_sum) {
          min_pair_sum = nums[i] + nums[i + 1];
          min_pair_sum_index = i;
        }
      }

      nums[min_pair_sum_index] = min_pair_sum;
      for (size_t i = min_pair_sum_index + 2; i < nums_valid_size; i++) {
        nums[i - 1] = nums[i];
      }

      nums_valid_size--;
      removal_count++;
    }

    return removal_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<int> nums = {5, 2, 3, 1};
  sol.minimumPairRemoval(nums);
}