/*
 * @lc app=leetcode id=1358 lang=cpp
 *
 * [1358] Number of Substrings Containing All Three Characters
 */

#include <string>
#include <unordered_map>

// @lc code=start
class Solution {
 public:
  int numberOfSubstrings(const std::string& s) {
    std::unordered_map<char, int> charToCount;

    int left = 0;
    int right = 0;
    int substringNumber = 0;

    while (true) {
      if (charToCount.size() < 3) {
        if (right == s.size()) {
          break;
        }

        charToCount[s[right]]++;
        right++;
      } else {
        substringNumber += static_cast<int>(s.size()) - right + 1;
        charToCount[s[left]]--;
        if (charToCount[s[left]] == 0) {
          charToCount.erase(s[left]);
        }
        left++;
      }
    }

    return substringNumber;
  }
};
// @lc code=end
