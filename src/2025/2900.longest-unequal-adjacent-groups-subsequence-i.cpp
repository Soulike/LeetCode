/*
 * @lc app=leetcode id=2900 lang=cpp
 *
 * [2900] Longest Unequal Adjacent Groups Subsequence I
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::string> getLongestSubsequence(
      const std::vector<std::string>& words,
      const std::vector<int>& groups) {
    std::vector<std::string> longest_subsequence;
    longest_subsequence.push_back(words[0]);
    for (int i = 1; i < groups.size(); i++) {
      if (groups[i - 1] != groups[i]) {
        longest_subsequence.push_back(words[i]);
      }
    }

    return longest_subsequence;
  }
};
// @lc code=end
