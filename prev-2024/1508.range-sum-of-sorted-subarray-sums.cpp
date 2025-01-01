/*
 * @lc app=leetcode id=1508 lang=cpp
 *
 * [1508] Range Sum of Sorted Subarray Sums
 */
#include <algorithm>
#include <cmath>
#include <vector>

// @lc code=start
class Solution {
 public:
  int rangeSum(const std::vector<int>& nums, int n, int left, int right) {
    const int N = nums.size();
    std::vector<int> subArraySums;
    subArraySums.reserve(N * (N + 1) / 2);

    // First calculate prefixSums
    subArraySums.push_back(nums[0]);
    for (int i = 1; i < N; i++) {
      subArraySums.push_back(subArraySums.back() + nums[i]);
    }

    for (int i = 1; i < N; i++) {
      for (int j = i; j < N; j++) {
        subArraySums.push_back(subArraySums[j] - subArraySums[i - 1]);
      }
    }

    std::sort(subArraySums.begin(), subArraySums.end());

    const int MOD = static_cast<int>(std::pow(10, 9)) + 7;
    int result = 0;
    for (int i = left; i <= right; i++) {
      result += subArraySums[i - 1];
      result %= MOD;
    }
    return result;
  }
};
// @lc code=end
