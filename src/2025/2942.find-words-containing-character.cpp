/*
 * @lc app=leetcode id=2942 lang=cpp
 *
 * [2942] Find Words Containing Character
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> findWordsContaining(const std::vector<std::string>& words,
                                       const char x) {
    std::vector<int> indexes;
    for (int i = 0; i < words.size(); i++) {
      for (const char c : words[i]) {
        if (c == x) {
          indexes.push_back(i);
          break;
        }
      }
    }

    return indexes;
  }
};
// @lc code=end
