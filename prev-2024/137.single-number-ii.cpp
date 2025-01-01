/*
 * @lc app=leetcode id=137 lang=cpp
 *
 * [137] Single Number II
 */
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int singleNumber(vector<int>& nums) {
    int once = 0;
    int twice = 0;
    for (auto& num : nums) {
      // `num`s appears once so far
      once = (once ^ num) & ~twice;
      // `num`s appears twice so far
      twice = (twice ^ num) & ~once;
    }
    return once;
  }
};
// @lc code=end
