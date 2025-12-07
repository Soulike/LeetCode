/*
 * @lc app=leetcode id=1523 lang=cpp
 *
 * [1523] Count Odd Numbers in an Interval Range
 */

// @lc code=start
class Solution {
 public:
  int countOdds(int low, int high) {
    int count = 0;
    if (low % 2 == 1) {
      count++;
      low++;
    }
    if (high % 2 == 1) {
      count++;
      high--;
    }

    count += (high - low) / 2;
    return count;
  }
};
// @lc code=end
