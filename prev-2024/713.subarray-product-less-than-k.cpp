/*
 * @lc app=leetcode id=713 lang=cpp
 *
 * [713] Subarray Product Less Than K
 */
#include <vector>

using std::vector;
// @lc code=start
class Solution {
 public:
  int numSubarrayProductLessThanK(vector<int>& nums, int k) {
    int result = 0;

    int left = 0;
    int right = 0;
    long long currentProduct = 1;

    while (right < nums.size()) {
      currentProduct *= nums[right];
      while (currentProduct >= k && left <= right) {
        currentProduct /= nums[left];
        left++;
      }
      int subArrayLength = right - left + 1;
      result += subArrayLength;
      right++;
    }

    return result;
  }
};
// @lc code=end