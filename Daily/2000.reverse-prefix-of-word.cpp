/*
 * @lc app=leetcode id=2000 lang=cpp
 *
 * [2000] Reverse Prefix of Word
 */

#include <algorithm>
#include <string>

using std::string;

// @lc code=start
class Solution {
 public:
  string reversePrefix(string word, const char& ch) {
    auto i = word.find_first_of(ch);

    if (i != string::npos) {
      std::reverse(word.begin(), word.begin() + i + 1);
    }

    return word;
  }
};
// @lc code=end