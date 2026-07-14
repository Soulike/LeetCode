/*
 * @lc app=leetcode id=3336 lang=cpp
 *
 * [3336] Find the Number of Subsequences With Equal GCD
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int subsequencePairCount(const std::vector<int>& nums) {
    // dp[i][gcd1][gcd2] - Number of ways to handle the first i elements, with
    // the gcd of seq1 is gcd1, and the gcd of seq2 is gcd2
    const int max_num = *std::max_element(nums.cbegin(), nums.cend());
    // It is impossible for gcd to > max_num
    std::vector<std::vector<std::vector<int>>> dp(
        2, std::vector<std::vector<int>>(max_num + 1,
                                         std::vector<int>(max_num + 1, 0)));

    // Base case
    dp[0][0][0] = 1;

    for (int i = 1; i <= nums.size(); i++) {
      dp[i % 2] = std::vector<std::vector<int>>(
          max_num + 1, std::vector<int>(max_num + 1, 0));

      const int num = nums[i - 1];
      for (int j = 0; j <= max_num; j++) {
        const int new_gcd1 = CalculateGCD(j, num);
        for (int k = 0; k <= max_num; k++) {
          const int new_gcd2 = CalculateGCD(k, num);

          const int prev_value = dp[(i - 1) % 2][j][k];

          // Don't put into any seq
          dp[i % 2][j][k] += prev_value;
          dp[i % 2][j][k] %= kMod;

          // Put into seq1
          dp[i % 2][new_gcd1][k] += prev_value;
          dp[i % 2][new_gcd1][k] %= kMod;

          // Put into seq2
          dp[i % 2][j][new_gcd2] += prev_value;
          dp[i % 2][j][new_gcd2] %= kMod;
        }
      }
    }

    int total_pair_count = 0;
    for (int j = 1; j <= max_num; j++) {
      total_pair_count += dp[nums.size() % 2][j][j];
      total_pair_count %= kMod;
    }

    return total_pair_count;
  }

 private:
  static constexpr int kMod = 1e9 + 7;

  static constexpr int CalculateGCD(int num1, int num2) {
    if (num2 > num1) {
      std::swap(num1, num2);
    }
    while (num2 != 0) {
      const int remainder = num1 % num2;
      num1 = num2;
      num2 = remainder;
    }
    return num1;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.subsequencePairCount({1, 2, 3, 4});
}
