/*
 * @lc app=leetcode id=2678 lang=cpp
 *
 * [2678] Number of Senior Citizens
 */
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int countSeniors(std::vector<std::string>& details) {
    int result = 0;
    for (const auto& detail : details) {
      if (detail[11] >= '7' || detail[11] == '6' && detail[12] > '0') {
        result++;
      }
    }

    return result;
  }
};
// @lc code=end
