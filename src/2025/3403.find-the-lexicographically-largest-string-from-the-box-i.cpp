/*
 * @lc app=leetcode id=3403 lang=cpp
 *
 * [3403] Find the Lexicographically Largest String From the Box I
 */

#include <string>
#include <string_view>

// @lc code=start
class Solution {
 public:
  std::string answerString(const std::string& word, const int numFriends) {
    if (numFriends == 1) {
      return word;
    }
    const size_t max_string_size = word.size() - (numFriends - 1);
    const std::string_view word_string_view(word);
    std::string_view current_max_string =
        word_string_view.substr(0, max_string_size);
    for (int i = 1; i < word.size(); i++) {
      const size_t new_string_size = i + max_string_size - 1 >= word.size()
                                         ? std::string::npos
                                         : max_string_size;
      const std::string_view new_string =
          word_string_view.substr(i, new_string_size);
      if (current_max_string < new_string) {
        current_max_string = new_string;
      }
    }

    return std::string(current_max_string);
  }
};
// @lc code=end
