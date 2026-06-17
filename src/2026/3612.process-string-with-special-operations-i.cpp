/*
 * @lc app=leetcode id=3612 lang=cpp
 *
 * [3612] Process String with Special Operations I
 */

#include <algorithm>
#include <string>

// @lc code=start
class Solution {
 public:
  std::string processStr(const std::string& s) {
    static constexpr char REMOVE_LAST = '*';
    static constexpr char DUPLICATE = '#';
    static constexpr char REVERSE = '%';

    std::string result;
    for (const char c : s) {
      if (c == REMOVE_LAST) {
        if (result.empty()) {
          continue;
        }
        result.pop_back();
      } else if (c == DUPLICATE) {
        result += result;
      } else if (c == REVERSE) {
        std::ranges::reverse(result);
      } else {
        result += c;
      }
    }

    return result;
  }
};
// @lc code=end
