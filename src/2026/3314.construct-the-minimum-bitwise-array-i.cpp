/*
 * @lc app=leetcode id=3314 lang=cpp
 *
 * [3314] Construct the Minimum Bitwise Array I
 */

#include <bitset>
#include <optional>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> minBitwiseArray(const std::vector<int>& nums) {
    std::vector<int> result(nums.size());
    for (size_t i = 0; i < nums.size(); i++) {
      const std::optional<int> base = GetMinimumBitwiseOrBase(nums[i]);
      result[i] = base.value_or(-1);
    }
    return result;
  }

 private:
  // (n + 1) will cause the lowest 0 of n become 1
  // n | (n + 1):
  // All bits before the lowest 0 (excluded) of n stay the same,
  // All bits after the lowest 0 (included) become 1s.
  // So to make n minimum, find the lowest 0 of nums[i], and set the first 1
  // lower to the 0.
  static std::optional<int> GetMinimumBitwiseOrBase(const int num) {
    if (num == 2) {
      return std::nullopt;
    }

    // 2 <= num <= 1000
    std::bitset<10> bitset(num);
    size_t lowest_0_index = -1;
    for (size_t i = 0; i < bitset.size(); i++) {
      if (!bitset.test(i)) {
        lowest_0_index = i;
        break;
      }
    }
    bitset.set(lowest_0_index - 1, false);
    return bitset.to_ulong();
  }
};
// @lc code=end
