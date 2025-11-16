/*
 * @lc app=leetcode id=1513 lang=cpp
 *
 * [1513] Number of Substrings With Only 1s
 */

#include <string_view>

// @lc code=start
class Solution {
 public:
  int numSub(std::string_view s) {
    static constexpr size_t kMod = 1e9 + 7;

    size_t left = 0;
    size_t right = 0;
    size_t subarray_count = 0;

    do {
      while (left < s.size() && s[left] == '0') {
        left++;
      }
      if (left == s.size()) {
        return subarray_count;
      }

      right = left;
      while (right < s.size() && s[right] == '1') {
        subarray_count += right - left + 1;
        subarray_count %= kMod;
        right++;
      }
      if (right == s.size()) {
        break;
      }
      left = right;
    } while (true);

    return subarray_count;
  }
};
// @lc code=end
