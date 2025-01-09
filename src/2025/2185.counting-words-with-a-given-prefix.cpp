/*
 * @lc app=leetcode id=2185 lang=cpp
 *
 * [2185] Counting Words With a Given Prefix
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int prefixCount(const std::vector<std::string>& words,
                  const std::string& pref) {
    int count = 0;
    for (const std::string& word : words) {
      count += (word.find(pref) == 0);
    }

    return count;
  }
};
// @lc code=end
