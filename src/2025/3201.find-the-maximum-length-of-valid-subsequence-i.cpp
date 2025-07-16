/*
 * @lc app=leetcode id=3201 lang=cpp
 *
 * [3201] Find the Maximum Length of Valid Subsequence I
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int maximumLength(const std::vector<int>& nums) {
    // Possible patterns.
    // 1. All odds
    // 2. All evens.
    // 3. odd, even, odd, even, ...
    // 4. even, odd, even, odd, ...
    int all_odd_max_length = 0;
    int all_even_max_length = 0;

    int odd_first_alternate_max_length = 0;
    bool odd_first_alternate_need_odd = true;

    int even_first_alternate_max_length = 0;
    bool even_first_alternate_need_even = true;

    for (const int num : nums) {
      if (num % 2 == 0) {
        all_even_max_length++;
        if (!odd_first_alternate_need_odd) {
          odd_first_alternate_max_length++;
          odd_first_alternate_need_odd = true;
        }
        if (even_first_alternate_need_even) {
          even_first_alternate_max_length++;
          even_first_alternate_need_even = false;
        }
      } else {
        all_odd_max_length++;
        if (odd_first_alternate_need_odd) {
          odd_first_alternate_max_length++;
          odd_first_alternate_need_odd = false;
        }
        if (!even_first_alternate_need_even) {
          even_first_alternate_max_length++;
          even_first_alternate_need_even = true;
        }
      }
    }

    return std::max({all_even_max_length, all_odd_max_length,
                     even_first_alternate_max_length,
                     odd_first_alternate_max_length});
  }
};
// @lc code=end
