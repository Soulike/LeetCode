/*
 * @lc app=leetcode id=1790 lang=cpp
 *
 * [1790] Check if One String Swap Can Make Strings Equal
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  bool areAlmostEqual(std::string s1, std::string s2) {
    const std::string::size_type kStringLength = s1.size();

    int diff1Index = -1;
    int diff2Index = -1;

    for (int i = 0; i < kStringLength; i++) {
      if (s1[i] == s2[i]) {
        continue;
      }

      if (diff1Index == -1) {
        diff1Index = i;
      } else if (diff2Index == -1) {
        diff2Index = i;
      } else {
        return false;
      }
    }

    if (diff1Index == -1 && diff2Index == -1) {
      return true;
    } else if (diff1Index == -1 || diff2Index == -1) {
      return false;
    }

    return s1[diff1Index] == s2[diff2Index] && s1[diff2Index] == s2[diff1Index];
  }
};
// @lc code=end
