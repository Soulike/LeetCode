/*
 * @lc app=leetcode id=2131 lang=cpp
 *
 * [2131] Longest Palindrome by Concatenating Two Letter Words
 */

#include <algorithm>
#include <string>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int longestPalindrome(const std::vector<std::string>& words) {
    std::unordered_map<std::string, int> word_to_counts;
    for (const std::string& word : words) {
      word_to_counts[word]++;
    }

    int palindrome_length = 0;
    bool has_single_symmetric_word = false;
    for (const auto& [word, count] : word_to_counts) {
      if (word[0] > word[1]) {
        continue;
      }

      if (word[0] == word[1]) {
        has_single_symmetric_word = has_single_symmetric_word || count % 2;
        palindrome_length += 4 * (count / 2);
        continue;
      }
      const auto symmetric_word = std::string(word.crbegin(), word.crend());
      const int symmetric_word_count = word_to_counts.contains(symmetric_word)
                                           ? word_to_counts.at(symmetric_word)
                                           : 0;
      palindrome_length += 4 * std::min(count, symmetric_word_count);
    }
    if (has_single_symmetric_word) {
      palindrome_length += 2;
    }
    return palindrome_length;
  }
};
// @lc code=end
