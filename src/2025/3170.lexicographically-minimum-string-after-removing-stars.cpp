/*
 * @lc app=leetcode id=3170 lang=cpp
 *
 * [3170] Lexicographically Minimum String After Removing Stars
 */

#include <array>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string clearStars(const std::string& s) {
    std::array<std::vector<int>, 26> char_to_indexes{};

    for (int i = 0; i < s.size(); i++) {
      if (s[i] != '*') {
        char_to_indexes[s[i] - 'a'].push_back(i);
      } else {
        for (int j = 0; j < 26; j++) {
          if (!char_to_indexes[j].empty()) {
            char_to_indexes[j].pop_back();
            break;
          }
        }
      }
    }

    std::vector<int> result_string_components(s.size(), -1);
    for (int i = 0; i < 26; i++) {
      const std::vector<int>& indexes = char_to_indexes[i];
      for (const int index : indexes) {
        result_string_components[index] = i;
      }
    }

    std::string result_string;
    for (const int component : result_string_components) {
      if (component == -1) {
        continue;
      }
      result_string.push_back(static_cast<char>('a' + component));
    }

    return result_string;
  }
};
// @lc code=end
