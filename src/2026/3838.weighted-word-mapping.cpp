/*
 * @lc app=leetcode id=3838 lang=cpp
 *
 * [3838] Weighted Word Mapping
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string mapWordWeights(const std::vector<std::string>& words,
                             const std::vector<int>& weights) {
    std::string result;
    result.reserve(words.size());
    for (const std::string& word : words) {
      int weight_sum_mod = 0;
      for (const char letter : word) {
        weight_sum_mod += weights[letter - 'a'];
        weight_sum_mod %= 26;
      }
      result.push_back('a' + (25 - weight_sum_mod));
    }
    return result;
  }
};
// @lc code=end
