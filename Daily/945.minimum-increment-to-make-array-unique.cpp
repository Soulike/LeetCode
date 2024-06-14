/*
 * @lc app=leetcode id=945 lang=cpp
 *
 * [945] Minimum Increment to Make Array Unique
 */
#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minIncrementForUnique(std::vector<int>& nums) {
    std::sort(nums.begin(), nums.end());
    int lastUniqueNum = -1;
    int incrementNumber = 0;
    for (const int num : nums) {
      if (num > lastUniqueNum) {
        lastUniqueNum = num;
      } else {
        lastUniqueNum++;
        incrementNumber += lastUniqueNum - num;
      }
    }

    return incrementNumber;
  }
};
// @lc code=end
