/*
 * @lc app=leetcode id=1684 lang=cpp
 *
 * [1684] Count the Number of Consistent Strings
 */
#include <string>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int countConsistentStrings(std::string allowed,
                             std::vector<std::string>& words) {
    const std::unordered_set<char> allowedChars(allowed.cbegin(),
                                                allowed.cend());
    int count = 0;
    for (const auto& word : words) {
      bool isConsistent = true;
      for (const auto c : word) {
        if (!allowedChars.contains(c)) {
          isConsistent = false;
          break;
        }
      }
      if (isConsistent) {
        count++;
      }
    }

    return count;
  }
};
// @lc code=end
