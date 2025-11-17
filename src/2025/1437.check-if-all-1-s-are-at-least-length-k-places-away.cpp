/*
 * @lc app=leetcode id=1437 lang=cpp
 *
 * [1437] Check If All 1's Are at Least Length K Places Away
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  bool kLengthApart(const std::vector<int>& nums, const int k) {
    int last_one_index = -1;
    for (int i = 0; i < nums.size(); i++) {
      if (nums[i] == 1) {
        if (last_one_index == -1) {
          last_one_index = i;
        } else {
          const int interval = i - last_one_index - 1;
          if (interval < k) {
            return false;
          }
          last_one_index = i;
        }
      }
    }

    return true;
  }
};
// @lc code=end
