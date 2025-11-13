/*
 * @lc app=leetcode id=3228 lang=cpp
 *
 * [3228] Maximum Number of Operations to Move Ones to the End
 */

#include <string>

// @lc code=start
class Solution {
 public:
  int maxOperations(std::string_view s) {
    size_t one_count = 0;
    size_t operation_count = 0;

    for (int i = 0; i < s.size(); i++) {
      if (s[i] == '1') {
        one_count++;
      } else if (i - 1 >= 0 && s[i - 1] == '1' && s[i] == '0') {
        operation_count += one_count;
      }
    }

    return operation_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxOperations("1001101");
}