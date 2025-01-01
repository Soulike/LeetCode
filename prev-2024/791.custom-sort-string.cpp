/*
 * @lc app=leetcode id=791 lang=cpp
 *
 * [791] Custom Sort String
 */
#include <algorithm>
#include <string>
#include <vector>

using std::string;
using std::vector;

// @lc code=start
class Solution {
 public:
  string customSortString(string order, string s) {
    vector<int> freq(26);
    std::fill(freq.begin(), freq.end(), 0);
    for (const char c : s) {
      freq[c - 'a']++;
    }

    string result;
    for (char c : order) {
      const int count = freq[c - 'a'];
      freq[c - 'a'] = 0;
      result.append(count, c);
    }

    for (int i = 0; i < 26; i++) {
      const int count = freq[i];
      if (count > 0)
        result.append(count, 'a' + i);
    }

    return result;
  }
};
// @lc code=end