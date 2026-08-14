/*
 * @lc app=leetcode id=3090 lang=cpp
 *
 * [3090] Maximum Length Substring With Two Occurrences
 */

#include <array>
#include <string>

// @lc code=start
class Solution {
 public:
  int maximumLengthSubstring(const std::string& s) {
    std::array<int, 26> letter_count_in_window = {};

    int left = 0;
    int right = 0;  // excluded
    int max_length = 0;

    while (right < s.size()) {
      while (left < right && letter_count_in_window[s[right] - 'a'] == 2) {
        max_length = std::max(max_length, right - left);
        left++;
        letter_count_in_window[s[left - 1] - 'a']--;
      }

      letter_count_in_window[s[right] - 'a']++;
      right++;
    }

    max_length = std::max(max_length, right - left);

    return max_length;
  }
};
// @lc code=end
