/*
 * @lc app=leetcode id=442 lang=cpp
 *
 * [442] Find All Duplicates in an Array
 */

#include <cmath>
#include <iostream>
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  vector<int> findDuplicates(vector<int>& nums) {
    vector<int> duplicates;
    for (int i = 0; i < nums.size(); i++) {
      int num = std::abs(nums[i]);
      int index = num - 1;
      if (nums[index] < 0) {
        duplicates.push_back(num);
      } else {
        nums[index] *= -1;
      }
    }

    return duplicates;
  }
};
// @lc code=end
