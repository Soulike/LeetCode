/*
 * @lc app=leetcode id=1935 lang=cpp
 *
 * [1935] Maximum Number of Words You Can Type
 */

#include <string>
#include <string_view>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int canBeTypedWords(std::string text, std::string broken_letters) {
    const std::unordered_set<char> broken_letters_set(broken_letters.cbegin(),
                                                      broken_letters.cend());
    const std::vector<std::string_view> words = split_with_space(text);
    int word_count = words.size();
    for (const std::string_view word : words) {
      for (const char letter : word) {
        if (broken_letters_set.contains(letter)) {
          word_count--;
          break;
        }
      }
    }

    return word_count;
  }

  static std::vector<std::string_view> split_with_space(
      const std::string_view text) {
    std::vector<std::string_view> segments;
    size_t prev_space_index = -1;
    for (size_t i = 0; i < text.size(); i++) {
      if (text[i] == ' ') {
        segments.push_back(
            text.substr(prev_space_index + 1, i - prev_space_index - 1));
        prev_space_index = i;
      }
    }
    segments.push_back(text.substr(prev_space_index + 1));
    return segments;
  }
};
// @lc code=end
