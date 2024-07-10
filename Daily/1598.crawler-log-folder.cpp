/*
 * @lc app=leetcode id=1598 lang=cpp
 *
 * [1598] Crawler Log Folder
 */
#include <cmath>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minOperations(const std::vector<std::string>& logs) {
    int distance = 0;
    for (const auto& log : logs) {
      if (log == "../") {
        distance = std::max(0, distance - 1);
      } else if (log == "./") {
        continue;
      } else {
        distance++;
      }
    }

    return distance;
  }
};
// @lc code=end
