/*
 * @lc app=leetcode id=3069 lang=cpp
 *
 * [3069] Distribute Elements Into Two Arrays I
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> resultArray(const std::vector<int>& nums) {
    std::vector<int> arr1, arr2;
    arr1.push_back(nums[0]);
    arr2.push_back(nums[1]);

    for (int i = 2; i < nums.size(); i++) {
      if (arr1.back() > arr2.back()) {
        arr1.push_back(nums[i]);
      } else {
        arr2.push_back(nums[i]);
      }
    }
    arr1.insert(arr1.end(), arr2.cbegin(), arr2.cend());
    return arr1;
  }
};
// @lc code=end
