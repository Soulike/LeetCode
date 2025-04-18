/*
 * @lc app=leetcode id=38 lang=cpp
 *
 * [38] Count and Say
 */

#include <memory>
#include <stack>
#include <string>

// @lc code=start
class Solution {
 public:
  std::string countAndSay(const int n) {
    if (n == 1) {
      return "1";
    }
    std::string prev_count_and_say = "1";
    std::string current_count_and_say;

    for (int i = 2; i <= n; i++) {
      int left = 0;
      int right = 0;
      while (right < prev_count_and_say.size()) {
        while (right < prev_count_and_say.size() &&
               prev_count_and_say[left] == prev_count_and_say[right]) {
          right++;
        }
        const int current_number_count = right - left;
        current_count_and_say +=
            std::to_string(current_number_count) + prev_count_and_say[left];
        left = right;
      }

      prev_count_and_say = std::move(current_count_and_say);
      current_count_and_say.clear();
    }

    return prev_count_and_say;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countAndSay(4);
}
