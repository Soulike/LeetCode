/*
 * @lc app=leetcode id=1189 lang=cpp
 *
 * [1189] Maximum Number of Balloons
 */

#include <string>
#include <unordered_map>
#include <unordered_set>

// @lc code=start
class Solution {
 public:
  int maxNumberOfBalloons(const std::string& text) {
    const std::unordered_set<char> letters = {'b', 'a', 'l', 'o', 'n'};
    std::unordered_map<char, int> letter_to_count;
    for (const char c : text) {
      if (letters.contains(c)) {
        letter_to_count[c]++;
      }
    }

    return std::min({letter_to_count['b'], letter_to_count['a'],
                     letter_to_count['l'] / 2, letter_to_count['o'] / 2,
                     letter_to_count['n']});
  }
};
// @lc code=end
