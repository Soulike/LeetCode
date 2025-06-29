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
    for (size_t left = 0; left < nums.size(); left++) {
      const int right_target = target - nums[left];
      const size_t right = BinarySearchUpperBound(nums, right_target);
      if (right <= left) {
        break;
      }
      const size_t between_element_count = right - left - 1;
      result += PowMod(2, between_element_count, kMod);
      result %= kMod;
    }
    return static_cast<int>(result);
  }

 private:
  static constexpr int kMod = 1e9 + 7;

  static size_t BinarySearchUpperBound(const std::vector<int>& nums,
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
  std::vector<int> nums = {3, 5, 6, 7};
  sol.numSubseq(nums, 9);
}
