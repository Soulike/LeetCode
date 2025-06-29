/*
 * @lc app=leetcode id=1498 lang=cpp
 *
 * [1498] Number of Subsequences That Satisfy the Given Sum Condition
 */

#include <algorithm>
#include <cinttypes>
#include <vector>

// @lc code=start
class Solution {
 public:
  int numSubseq(std::vector<int>& nums, const int target) {
    std::ranges::sort(nums);
    std::intmax_t result = 0;

    int left = 0;
    int right = nums.size() - 1;

    while (left <= right) {
      while (left <= right && nums[left] + nums[right] > target) {
        right--;
      }
      if (left > right) {
        break;
      }
      result += PowMod(2, right - left, kMod);
      result %= kMod;
      left++;
    }

    return static_cast<int>(result);
  }

 private:
  static constexpr int kMod = 1e9 + 7;

  static std::intmax_t PowMod(const std::intmax_t base,
                              const size_t exp,
                              const std::intmax_t mod) {
    std::intmax_t result = 1;
    size_t left_exp = exp;
    std::intmax_t current_base = base;

    while (left_exp > 0) {
      if (left_exp % 2) {
        result *= current_base;
        result %= mod;
      }
      current_base *= current_base;
      current_base %= mod;
      left_exp /= 2;
    }

    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<int> nums = {14, 4,  6,  6,  20, 8,  5,  6,  8,  12, 6,  10,
                           14, 9,  17, 16, 9,  7,  14, 11, 14, 15, 13, 11,
                           10, 18, 13, 17, 17, 14, 17, 7,  9,  5,  10, 13,
                           8,  5,  18, 20, 7,  5,  5,  15, 19, 14};
  sol.numSubseq(nums, 22);
}
