/*
 * @lc app=leetcode id=2138 lang=cpp
 *
 * [2138] Divide a String Into Groups of Size k
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::string> divideString(std::string s, int k, char fill) {
    std::vector<std::string> segments;
    int left = 0;

    while (left < s.size()) {
      segments.push_back(s.substr(left, k));
      left += k;
    }

    while (segments.back().size() < k) {
      segments.back().push_back(fill);
    }

    return segments;
  }
};
// @lc code=end
