/*
 * @lc app=leetcode id=2411 lang=cpp
 *
 * [2411] Smallest Subarrays With Maximum Bitwise OR
 */

#include <array>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> smallestSubarrays(const std::vector<int>& nums) {
    std::vector<int> subarray_sizes(nums.size(), -1);
    std::array<int, 32> bit_last_index = {};
    bit_last_index.fill(-1);

    for (int i = nums.size() - 1; i >= 0; i--) {
      int subarray_size = 1;
      int current_num = nums[i];

      for (int bit = 0; bit < 31; bit++) {
        if ((current_num & 0b1) == 1) {
          bit_last_index[bit] = i;
        } else if (bit_last_index[bit] != -1) {
          subarray_size = std::max(subarray_size, bit_last_index[bit] - i + 1);
        }
        current_num >>= 1;
      }

      subarray_sizes[i] = subarray_size;
    }

    return subarray_sizes;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.smallestSubarrays({1, 0, 2, 1, 3});
}
