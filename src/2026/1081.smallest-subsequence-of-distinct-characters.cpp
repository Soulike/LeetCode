/*
 * @lc app=leetcode id=1081 lang=cpp
 *
 * [1081] Smallest Subsequence of Distinct Characters
 */

#include <algorithm>
#include <array>
#include <stack>
#include <string>

// @lc code=start
class Solution {
 public:
  std::string smallestSubsequence(std::string s) {
    std::array<int, 26> remaining_char_freqs = {};
    for (const char c : s) {
      remaining_char_freqs[c - 'a']++;
    }
    std::array<bool, 26> is_in_stack = {};

    std::stack<char> increasing_stack;

    for (const char c : s) {
      if (is_in_stack[c - 'a']) {
        remaining_char_freqs[c - 'a']--;
        continue;
      }
      is_in_stack[c - 'a'] = true;

      while (!increasing_stack.empty() && increasing_stack.top() >= c &&
             // We can not remove the top char if non left in s.
             remaining_char_freqs[increasing_stack.top() - 'a'] > 0) {
        is_in_stack[increasing_stack.top() - 'a'] = false;
        increasing_stack.pop();
      }

      increasing_stack.push(c);
      remaining_char_freqs[c - 'a']--;
    }

    std::string result;
    result.reserve(increasing_stack.size());
    while (!increasing_stack.empty()) {
      result.push_back(increasing_stack.top());
      increasing_stack.pop();
    }

    std::ranges::reverse(result);
    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.smallestSubsequence("bcbcbcababa");
}
