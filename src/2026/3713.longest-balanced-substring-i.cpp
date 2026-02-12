/*
 * @lc app=leetcode id=3713 lang=cpp
 *
 * [3713] Longest Balanced Substring I
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int longestBalanced(const std::string& s) {
    int longest_size = 0;
    for (int i = 0; i < s.size(); i++) {
      std::unordered_map<char, int> letter_to_count;
      for (int j = i; j < s.size(); j++) {
        letter_to_count[s[j]]++;

        const int expected_count = letter_to_count.begin()->second;
        bool is_balanced = true;
        for (const auto& [letter, count] : letter_to_count) {
          if (count != expected_count) {
            is_balanced = false;
            break;
          }
        }
        if (is_balanced) {
          longest_size = std::max(longest_size, j - i + 1);
        }
      }
    }

    return longest_size;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.longestBalanced("abbac");
}