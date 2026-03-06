/*
 * @lc app=leetcode id=1784 lang=cpp
 *
 * [1784] Check if Binary String Has at Most One Segment of Ones
 */

#include <string>

// @lc code=start
class Solution {
 public:
  bool checkOnesSegment(const std::string& s) {
    bool is_in_segment = false;
    int segment_count = 0;
    for (const char c : s) {
      if (c == '0') {
        is_in_segment = false;
      } else if (c == '1' && !is_in_segment) {
        is_in_segment = true;
        segment_count++;
        if (segment_count > 1) {
          return false;
        }
      }
    }

    return true;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.checkOnesSegment("1001");
}
