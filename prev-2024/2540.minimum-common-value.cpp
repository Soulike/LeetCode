/*
 * @lc app=leetcode id=2540 lang=cpp
 *
 * [2540] Minimum Common Value
 */
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int getCommon(vector<int>& nums1, vector<int>& nums2) {
    int index1 = 0;
    int index2 = 0;

    while (index1 < nums1.size() && index2 < nums2.size()) {
      int num1 = nums1[index1];
      int num2 = nums2[index2];
      if (num1 < num2) {
        index1++;
      } else if (num1 > num2) {
        index2++;
      } else {
        return num1;
      }
    }

    return -1;
  }
};
// @lc code=end
