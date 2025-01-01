/*
 * @lc app=leetcode id=2981 lang=cpp
 *
 * [2981] Find Longest Special Substring That Occurs Thrice I
 */

#include <string>
#include <string_view>
#include <unordered_map>

// @lc code=start
class Solution {
 public:
  int maximumLength(const std::string& s) {
    std::unordered_map<std::string_view, std::uint8_t> subStringToOccurrence;
    int maxSubStringLength = -1;
    const std::string_view sStringView(s);

    for (int i = 0; i < s.size(); i++) {
      for (int j = i; j < s.size(); j++) {
        if (s[i] != s[j]) {
          break;
        }
        std::string_view subString = sStringView.substr(i, j - i + 1);
        subStringToOccurrence[subString]++;

        if (subStringToOccurrence[subString] >= 3) {
          maxSubStringLength =
              std::max(maxSubStringLength, static_cast<int>(subString.size()));
        }
      }
    }

    return maxSubStringLength;
  }
};

// @lc code=end
