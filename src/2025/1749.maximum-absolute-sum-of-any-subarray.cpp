/*
 * @lc app=leetcode id=1749 lang=cpp
 *
 * [1749] Maximum Absolute Sum of Any Subarray
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int maxAbsoluteSum(const std::vector<int>& nums) {
    return std::max(std::abs(findMaximumSubarraySum(nums)),
                    std::abs(findMinimumSubarraySum(nums)));
  }

 private:
  static int findMinimumSubarraySum(const std::vector<int>& nums) {
    int minSum = 0;
    int minSumEndingHere = 0;
    for (const int num : nums) {
      minSumEndingHere = std::min(num, minSumEndingHere + num);
      minSum = std::min(minSum, minSumEndingHere);
    }

    return minSum;
  }

  static int findMaximumSubarraySum(const std::vector<int>& nums) {
    int maxSum = 0;
    int maxSumEndingHere = 0;
    for (const int num : nums) {
      maxSumEndingHere = std::max(num, maxSumEndingHere + num);
      maxSum = std::max(maxSum, maxSumEndingHere);
    }

    return maxSum;
  }
};
// @lc code=end

int main() {
  std::vector<int> nums = {1, -3, 2, 3, -4};
  Solution sol;
  sol.maxAbsoluteSum(nums);
}
