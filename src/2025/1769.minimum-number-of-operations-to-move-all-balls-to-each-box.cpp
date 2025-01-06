/*
 * @lc app=leetcode id=1769 lang=cpp
 *
 * [1769] Minimum Number of Operations to Move All Balls to Each Box
 */

#include <cmath>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> minOperations(const std::string& boxes) {
    std::vector<int> result(boxes.size(), 0);
    for (int i = 0; i < boxes.size(); i++) {
      if (boxes[i] == '1') {
        for (int j = 0; j < boxes.size(); j++) {
          result[j] += std::abs(i - j);
        }
      }
    }

    return result;
  }
};
// @lc code=end
