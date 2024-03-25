/*
 * @lc app=leetcode id=287 lang=cpp
 *
 * [287] Find the Duplicate Number
 */
#include <cmath>
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int findDuplicate(vector<int>& nums) {
    int slow = 0;
    int fast = 0;
    while (true) {
      slow = nums[slow];
      fast = nums[nums[fast]];
      if (slow == fast)
        break;
    }

    int temp = 0;
    while (true) {
      slow = nums[slow];
      temp = nums[temp];
      if (slow == temp)
        break;
    }
    return slow;
  }
};
// @lc code=end