/*
 * @lc app=leetcode id=1590 lang=cpp
 *
 * [1590] Make Sum Divisible by P
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minSubarray(const std::vector<int>& nums, const int p) {
    int subarray_sum_remainder = 0;
    for (int i = 0; i < nums.size(); i++) {
      subarray_sum_remainder += nums[i];
      subarray_sum_remainder %= p;
    }
    if (subarray_sum_remainder == 0) {
      return 0;
    }

    // We need to remove a subarray whose sum % p == subarray_sum_remainder.
    std::unordered_map<int, int> remainder_to_last_index;
    remainder_to_last_index[0] = -1;
    int subarray_length = nums.size();
    int current_remainder = 0;
    for (int i = 0; i < nums.size(); i++) {
      current_remainder = (current_remainder + nums[i]) % p;
      // Assume we use prefix sum, with current_sum, we need to find the
      // previous_sum that makes (current_sum - previous_sum) % p ==
      // subarray_sum_remainder.
      // With remainders, it becomes
      // (current_remainder - subarray_sum_remainder + p) % p ==
      // subarray_sum_remainder.
      const int needed_remainder =
          (current_remainder - subarray_sum_remainder + p) % p;
      if (remainder_to_last_index.contains(needed_remainder)) {
        subarray_length =
            std::min({subarray_length,
                      i - remainder_to_last_index.at(needed_remainder)});
      }
      remainder_to_last_index[current_remainder] = i;
    }

    return subarray_length == nums.size() ? -1 : subarray_length;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minSubarray({3, 1, 4, 2}, 6);
}