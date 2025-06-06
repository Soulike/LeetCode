/*
 * @lc app=leetcode id=2434 lang=cpp
 *
 * [2434] Using a Robot to Print the Lexicographically Smallest String
 */

#include <array>
#include <stack>
#include <string>

// @lc code=start
class Solution {
 public:
  std::string robotWithString(const std::string& s) {
    std::array<int, 26> char_to_freq = GetCharFreq(s);
    std::stack<char> stack;
    std::string result_string;

    for (const char c : s) {
      stack.push(c);
      char_to_freq[c - 'a']--;
      const char smallest_char = GetSmallestChar(char_to_freq);
      while (!stack.empty()) {
        const char stack_top_char = stack.top();
        if (smallest_char < stack_top_char) {
          break;
        }
        result_string.push_back(stack.top());
        stack.pop();
      }
    }

    return result_string;
  }

 private:
  std::array<int, 26> GetCharFreq(const std::string& str) {
    std::array<int, 26> freq = {};
    for (const char c : str) {
      freq[c - 'a']++;
    }
    return freq;
  }

  char GetSmallestChar(const std::array<int, 26>& char_to_freq) {
    for (int i = 0; i < char_to_freq.size(); i++) {
      if (char_to_freq[i] > 0) {
        return static_cast<char>('a' + i);
      }
    }

    return CHAR_MAX;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.robotWithString("zza");
}
