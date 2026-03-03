/*
 * @lc app=leetcode id=1545 lang=cpp
 *
 * [1545] Find Kth Bit in Nth Binary String
 */

#include <format>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  char findKthBit(const int n, const int k) {
    if (n == 1) {
      return '0';
    }

    const int string_size = (1 << n) - 1;
    const int mid_index = string_size / 2;

    if (k - 1 == mid_index) {
      return '1';
    }

    if (k - 1 < mid_index) {
      return findKthBit(n - 1, k);
    }

    return findKthBit(n - 1, string_size - k + 1) == '0' ? '1' : '0';
  }
};
// @lc code=end
