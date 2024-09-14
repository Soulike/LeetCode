/*
 * @lc app=leetcode id=2419 lang=cpp
 *
 * [2419] Longest Subarray With Maximum Bitwise AND
 */
#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int longestSubarray(std::vector<int>& nums) {
    int subarrayLength = 1;
    int maxSubarrayLength = 1;

    int currentMaxNum = nums[0];

    for (int i = 1; i < nums.size(); i++) {
      if (nums[i] == currentMaxNum && nums[i] == nums[i - 1]) {
        subarrayLength++;
        maxSubarrayLength = std::max(maxSubarrayLength, subarrayLength);
      } else {
        if (currentMaxNum < nums[i]) {
          currentMaxNum = nums[i];
          maxSubarrayLength = 1;
        }
        subarrayLength = 1;
      }
    }

    return maxSubarrayLength;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<int> nums = {1, 2, 3, 3, 2, 2};
  sol.longestSubarray(nums);
}
