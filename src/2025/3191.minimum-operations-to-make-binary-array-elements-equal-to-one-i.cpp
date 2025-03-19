/*
 * @lc app=leetcode id=3191 lang=cpp
 *
 * [3191] Minimum Operations to Make Binary Array Elements Equal to One I
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int minOperations(std::vector<int>& nums) {
    int operationNumber = 0;
    for (int i = 0; i < nums.size(); i++) {
      if (nums[i] == 0) {
        for (int j = 0; j < 3; j++) {
          if (i + j == nums.size()) {
            return -1;
          }
          nums[i + j] = 1 - nums[i + j];
        }
        operationNumber++;
      }
    }

    return operationNumber;
  }
};
// @lc code=end
