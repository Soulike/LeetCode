/*
 * @lc app=leetcode id=1458 lang=cpp
 *
 * [1458] Max Dot Product of Two Subsequences
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int maxDotProduct(const std::vector<int>& nums1,
                    const std::vector<int>& nums2) {
    const std::size_t num1_size = nums1.size();
    const std::size_t num2_size = nums2.size();

    // dp[i][j] - max dot product in subsequences end with nums1[i] and nums2[j]
    // Base case
    // dp[0][0] = nums1[0] * nums2[0]
    // Formula
    // dp[i][j] = std::max(nums1[i] * nums2[j], dp[i-1][j-1] + nums1[i] *
    // nums2[j], dp[i][j-1], dp[i-1][j])
    std::vector<std::vector<int>> dp(2, std::vector<int>(num2_size, -1));

    for (int i = 0; i < num1_size; i++) {
      for (int j = 0; j < num2_size; j++) {
        dp[i % 2][j] = std::max({
            // Start new sequence with nums1[i] and nums2[j]
            nums1[i] * nums2[j],
            // Put nums1[i] and nums2[j] at the end of previous sequence
            i - 1 >= 0 && j - 1 >= 0
                ? dp[(i - 1) % 2][j - 1] + nums1[i] * nums2[j]
                : INT_MIN,
            // Just ignore nums2[j]
            j - 1 >= 0 ? dp[i % 2][j - 1] : INT_MIN,
            // Just ignore nums1[i]
            i - 1 >= 0 ? dp[(i - 1) % 2][j] : INT_MIN
            // We can ignore both, but it won't be larger than ignoring any one
            // of them.
        });
      }
    }

    return dp[(num1_size - 1) % 2][num2_size - 1];
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxDotProduct({5, -4, -3}, {-4, -3, 0, -4, 2});
}