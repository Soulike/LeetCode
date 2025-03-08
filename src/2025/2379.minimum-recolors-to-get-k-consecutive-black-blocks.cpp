/*
 * @lc app=leetcode id=2379 lang=cpp
 *
 * [2379] Minimum Recolors to Get K Consecutive Black Blocks
 */

#include <string>

// @lc code=start
class Solution {
 public:
  int minimumRecolors(const std::string& blocks, const int k) {
    constexpr char kWhite = 'W';
    constexpr char kBlock = 'B';

    int left = 0;
    int right = 0;
    int recolorNum = 0;
    int minRecolorNum = 0;

    while (right < k) {
      if (blocks[right] == kWhite) {
        recolorNum++;
      }
      right++;
    }
    minRecolorNum = recolorNum;

    while (right < blocks.size()) {
      if (blocks[left] == kWhite) {
        recolorNum--;
      }
      if (blocks[right] == kWhite) {
        recolorNum++;
      }
      left++;
      right++;
      minRecolorNum = std::min(minRecolorNum, recolorNum);
    }

    return minRecolorNum;
  }
};
// @lc code=end
