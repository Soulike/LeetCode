/*
 * @lc app=leetcode id=2444 lang=cpp
 *
 * [2444] Count Subarrays With Fixed Bounds
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  long long countSubarrays(const std::vector<int>& nums,
                           const int min_k,
                           const int max_k) {
    long long subarray_count = 0;
    int current_range_start = 0;
    int current_range_min_k_index = -1;
    int current_range_max_k_index = -1;

    for (int i = 0; i < nums.size(); i++) {
      if (nums[i] < min_k || nums[i] > max_k) {
        current_range_start = i + 1;
        current_range_min_k_index = -1;
        current_range_max_k_index = -1;
      }

      if (nums[i] == min_k) {
        current_range_min_k_index = i;
      }

      if (nums[i] == max_k) {
        current_range_max_k_index = i;
      }

      if (current_range_min_k_index != -1 && current_range_max_k_index != -1) {
        subarray_count +=
            std::min(current_range_max_k_index, current_range_min_k_index) -
            current_range_start + 1;
      }
    }

    return subarray_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countSubarrays({1, 3, 5, 2, 7, 5}, 1, 5);
}
