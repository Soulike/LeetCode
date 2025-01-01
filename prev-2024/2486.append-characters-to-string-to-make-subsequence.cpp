/*
 * @lc app=leetcode id=2486 lang=cpp
 *
 * [2486] Append Characters to String to Make Subsequence
 */
#include <string>

using std::string;

// @lc code=start
class Solution {
 public:
  int appendCharacters(string s, string t) {
    typename string::size_type sIndex = 0;
    typename string::size_type tIndex = 0;

    while (sIndex < s.size() && tIndex < t.size()) {
      if (s[sIndex] == t[tIndex]) {
        tIndex++;
      }

      sIndex++;
    }

    return t.size() - tIndex;
  }
};
// @lc code=end
