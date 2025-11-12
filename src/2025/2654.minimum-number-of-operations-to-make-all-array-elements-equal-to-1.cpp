/*
 * @lc app=leetcode id=2654 lang=cpp
 *
 * [2654] Minimum Number of Operations to Make All Array Elements Equal to 1
 */

#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minOperations(const std::vector<int>& nums) {
    // Attempt 1: If the GCD of all nums is not 1
    if (std::accumulate(nums.cbegin(), nums.cend(), nums[0], GetGCD) != 1) {
      return -1;
    }

    // Attempt 2: If any num is 1
    int one_count = 0;
    for (int i = 0; i < nums.size(); i++) {
      one_count += nums[i] == 1;
    }
    if (one_count > 0) {
      return nums.size() - one_count;
    }

    // Attempt 3: Find shorted window that the GCD of the window is 1.
    int current_window_gcd = -1;
    int min_1_gcd_window_size = INT_MAX;

    for (int i = 0; i < nums.size(); i++) {
      current_window_gcd = nums[i];
      for (int j = i + 1; j < nums.size(); j++) {
        current_window_gcd = GetGCD(current_window_gcd, nums[j]);
        if (current_window_gcd == 1) {
          min_1_gcd_window_size = std::min(min_1_gcd_window_size, j - i + 1);
          break;
        }
      }
    }

    if (min_1_gcd_window_size == INT_MAX) {
      return -1;
    }

    // Need `min_1_gcd_window_size - 1` operations to get the first 1 in the
    // window
    return (min_1_gcd_window_size - 1) +
           // With the first 1, we need `nums.size() - 1` operations to make all
           // nums to 1.
           (nums.size() - 1);
  }

 private:
  static int GetGCD(int num1, int num2) {
    if (num1 < num2) {
      const int temp = num1;
      num1 = num2;
      num2 = temp;
    }
    int remainder = 1;
    while (remainder != 0) {
      remainder = num1 % num2;
      num1 = num2;
      num2 = remainder;
    }
    return num1;
  }
};
// @lc code=end
