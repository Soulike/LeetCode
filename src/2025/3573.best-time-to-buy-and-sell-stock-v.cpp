/*
 * @lc app=leetcode id=3573 lang=cpp
 *
 * [3573] Best Time to Buy and Sell Stock V
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long maximumProfit(const std::vector<int>& prices, const int k) {
    const int n = prices.size();

    // dp[i % 2][j] - max profit after day i with at most j transactions
    // completed
    std::vector<std::vector<long long>> dp(2, std::vector<long long>(k + 1, 0));

    // bought[i % 2][j] - max profit after day i, in the (j+1)-th transaction,
    // holding stock
    std::vector<std::vector<long long>> bought(
        2, std::vector<long long>(k, LONG_LONG_MIN));

    // sold[i % 2][j] - max profit after day i, in the (j+1)-th transaction,
    // short selling
    std::vector<std::vector<long long>> sold(2, std::vector<long long>(k, 0));

    // Handle day 0 separately
    for (int j = 0; j < k; ++j) {
      bought[0][j] = -prices[0];  // Buy on day 0
      sold[0][j] = prices[0];     // Short sell on day 0
    }

    for (int i = 1; i < n; ++i) {
      const int price = prices[i];
      const int today = i % 2;
      const int yesterday = (i - 1) % 2;

      for (int j = k; j >= 1; --j) {
        dp[today][j] =
            std::max({dp[yesterday][j], bought[yesterday][j - 1] + price,
                      sold[yesterday][j - 1] - price});

        bought[today][j - 1] =
            std::max(bought[yesterday][j - 1], dp[yesterday][j - 1] - price);

        sold[today][j - 1] =
            std::max(sold[yesterday][j - 1], dp[yesterday][j - 1] + price);
      }
    }

    return *std::ranges::max_element(dp[(n - 1) % 2]);
  }
};
// @lc code=end
