/*
 * @lc app=leetcode id=38 lang=cpp
 *
 * [38] Count and Say
 */

#include <string>

// @lc code=start
class Solution {
 public:
  std::string countAndSay(const int n) {
    if (n == 1) {
      return "1";
    }

    const std::string prev_count_and_say = countAndSay(n - 1);
    int left = 0;
    int right = 0;
    int current_number_count = 0;
    std::string current_count_and_say;

    while (right < prev_count_and_say.size()) {
      while (right < prev_count_and_say.size() &&
             prev_count_and_say[right] == prev_count_and_say[left]) {
        current_number_count++;
        right++;
      }
      current_count_and_say +=
          std::to_string(current_number_count) + prev_count_and_say[left];
      left = right;
      current_number_count = 0;
    }

    return current_count_and_say;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countAndSay(20);
}
