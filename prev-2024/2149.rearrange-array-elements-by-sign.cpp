/*
 * @lc app=leetcode id=2149 lang=cpp
 *
 * [2149] Rearrange Array Elements by Sign
 */
#include <vector>
using std::vector;

// @lc code=start
class Solution {
 public:
  vector<int> rearrangeArray(vector<int>& nums) {
    int positiveCurrentIndex = 0;
    int negativeCurrentIndex = 1;

    vector<int> result(nums.size());
    for (int i = 0; i < nums.size(); i++) {
      if (nums[i] < 0) {
        result[negativeCurrentIndex] = nums[i];
        negativeCurrentIndex += 2;
      } else {
        result[positiveCurrentIndex] = nums[i];
        positiveCurrentIndex += 2;
      }
    }

    return result;
  }
};
// @lc code=end
