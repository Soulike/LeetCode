/*
 * @lc app=leetcode id=1371 lang=cpp
 *
 * [1371] Find the Longest Substring Containing Vowels in Even Counts
 */
#include <algorithm>
#include <cinttypes>
#include <string>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int findTheLongestSubstring(std::string s) {
    const std::unordered_map<char, std::uint8_t> vowelToMask({
        {'a', 0b00000001},
        {'e', 0b00000010},
        {'i', 0b00000100},
        {'o', 0b00001000},
        {'u', 0b00010000},
    });
    std::unordered_map<std::uint8_t, int> xorFirstIndex({{0, -1}});

    int longestSubstringLength = 0;

    std::vector<std::uint8_t> prefixXor(s.size());
    if (vowelToMask.contains(s[0])) {
      prefixXor[0] = vowelToMask.at(s[0]);
    }
    if (prefixXor[0] == 0) {
      longestSubstringLength = 1;
    } else {
      xorFirstIndex[prefixXor[0]] = 0;
    }

    for (int i = 1; i < s.size(); i++) {
      prefixXor[i] = prefixXor[i - 1];
      if (vowelToMask.contains(s[i])) {
        prefixXor[i] ^= vowelToMask.at(s[i]);
      }

      if (xorFirstIndex.contains(prefixXor[i])) {
        longestSubstringLength =
            std::max(longestSubstringLength, i - xorFirstIndex[prefixXor[i]]);
      } else {
        xorFirstIndex[prefixXor[i]] = i;
      }
    }

    return longestSubstringLength;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.findTheLongestSubstring("eleetminicoworoep");
}
