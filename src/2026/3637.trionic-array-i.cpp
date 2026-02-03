/*
 * @lc app=leetcode id=3637 lang=cpp
 *
 * [3637] Trionic Array I
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  bool isTrionic(const std::vector<int>& nums) {
    const int first_increasing_until = IsIncreasingUntil(nums, 0);
    if (first_increasing_until == 0) {
      return false;
    }
    const int second_decreasing_until =
        IsDecreasingUntil(nums, first_increasing_until);
    if (second_decreasing_until == first_increasing_until) {
      return false;
    }
    const int third_increasing_until =
        IsIncreasingUntil(nums, second_decreasing_until);
    if (third_increasing_until == second_decreasing_until ||
        third_increasing_until != nums.size() - 1) {
      return false;
    }
    return true;
  }

 private:
  static int IsIncreasingUntil(const std::vector<int>& nums, const int begin) {
    int increasing_until = begin;
    for (int i = begin + 1; i < nums.size(); i++) {
      if (nums[i - 1] < nums[i]) {
        increasing_until = i;
      } else {
        break;
      }
    }

    return increasing_until;
  }

  static int IsDecreasingUntil(const std::vector<int>& nums, const int begin) {
    int decreasing_until = begin;
    for (int i = begin + 1; i < nums.size(); i++) {
      if (nums[i - 1] > nums[i]) {
        decreasing_until = i;
      } else {
        break;
      }
    }

    return decreasing_until;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.isTrionic({2, 1, 3});
}