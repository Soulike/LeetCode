/*
 * @lc app=leetcode id=1422 lang=cpp
 *
 * [1422] Maximum Score After Splitting a String
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxScore(const std::string& s) {
    int totalOnesCount = 0;
    for (int i = 0; i < s.size(); i++) {
      totalOnesCount += (s[i] == '1');
    }

    int maximumScore = 0;
    int currentLeftZerosCount = 0;
    // `i < s.size() - 1`: leave at lease 1 element for right part
    for (int i = 0; i < s.size() - 1; i++) {
      currentLeftZerosCount += s[i] == '0';
      const int currentLeftOnesCount = (i + 1) - currentLeftZerosCount;
      const int currentRightOnesCount = totalOnesCount - currentLeftOnesCount;
      maximumScore =
          std::max(maximumScore, currentLeftZerosCount + currentRightOnesCount);
    }
    return maximumScore;
  }
};
// @lc code=end
