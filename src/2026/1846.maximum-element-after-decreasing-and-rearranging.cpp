/*
 * @lc app=leetcode id=1846 lang=cpp
 *
 * [1846] Maximum Element After Decreasing and Rearranging
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maximumElementAfterDecrementingAndRearranging(std::vector<int>& arr) {
    std::ranges::sort(arr);
    arr[0] = 1;
    for (int i = 1; i < arr.size(); i++) {
      arr[i] = std::min(arr[i - 1] + 1, arr[i]);
    }
    return arr.back();
  }
};
// @lc code=end
