/*
 * @lc app=leetcode id=3223 lang=cpp
 *
 * [3223] Minimum Length of String After Operations
 */

#include <array>
#include <cinttypes>
#include <string>

// @lc code=start
class Solution {
 public:
  int minimumLength(const std::string& s) {
    std::array<std::int32_t, 26> letterToNumber;
    letterToNumber.fill(0);
    for (const char letter : s) {
      letterToNumber[letter - 'a']++;
    }

    int minLength = 0;
    for (int i = 0; i < 26; i++) {
      if (letterToNumber[i] == 0) {
        continue;
      }
      minLength += (letterToNumber[i] & 0b1) ? 1 : 2;
    }

    return minLength;
  }
};
// @lc code=end
