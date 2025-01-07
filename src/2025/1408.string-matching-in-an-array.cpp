/*
 * @lc app=leetcode id=1408 lang=cpp
 *
 * [1408] String Matching in an Array
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::string> stringMatching(std::vector<std::string>& words) {
    std::vector<std::string> results;
    for (int i = 0; i < words.size(); i++) {
      for (int j = 0; j < words.size(); j++) {
        if (i == j) {
          continue;
        }

        if (words[j].contains(words[i])) {
          results.push_back(words[i]);
          break;
        }
      }
    }

    return results;
  }
};
// @lc code=end
