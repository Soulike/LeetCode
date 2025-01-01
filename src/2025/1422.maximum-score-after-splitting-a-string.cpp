/*
 * @lc app=leetcode id=1422 lang=cpp
 *
 * [1422] Maximum Score After Splitting a String
 */

#include <string>
#include <utility>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxScore(const std::string& s) {
    /**
     * score = left zeros + right ones
     *       = left zeros + (total ones - left ones)
     *       = (left zeros - left ones) + total ones
     * "total ones" is a constant. Find maximum (left zeros - left ones).
     */

    int currentLeftZeroCount = 0;
    int currentLeftOneCount = 0;
    int maximumLeftZeroOneDiff = INT_MIN;

    for (int i = 0; i < s.size() - 1; i++) {
      currentLeftOneCount += s[i] == '1';
      currentLeftZeroCount += s[i] == '0';
      maximumLeftZeroOneDiff = std::max(
          maximumLeftZeroOneDiff, currentLeftZeroCount - currentLeftOneCount);
    }

    const int kTotalOneCount = currentLeftOneCount + (s.back() == '1');
    return maximumLeftZeroOneDiff + kTotalOneCount;
  }
};
// @lc code=end
