/*
 * @lc app=leetcode id=3363 lang=cpp
 *
 * [3363] Find the Maximum Number of Fruits Collected
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int maxCollectedFruits(const std::vector<std::vector<int>>& fruits) {
    const int count = GetUpperLeftChildMaxCollectCount(fruits) +
                      GetUpperRightChildMaxConnectCount(fruits) +
                      GetLowerLeftChildMaxConnectCount(fruits);
    return count;
  }

 private:
  static int GetUpperLeftChildMaxCollectCount(
      const std::vector<std::vector<int>>& fruits) {
    int count = 0;
    for (int i = 0; i < fruits.size(); i++) {
      count += fruits[i][i];
    }
    return count;
  }

  static int GetLowerLeftChildMaxConnectCount(
      const std::vector<std::vector<int>>& fruits) {
    // dp[i][j] = std::max(dp[i+1][j-1], dp[i][j-1], dp[i-1][j-1]) +
    // fruits[i][j]
    std::vector<std::vector<int>> dp(fruits.size(),
                                     std::vector<int>(fruits.size(), 0));
    dp[fruits.size() - 1][0] = fruits[fruits.size() - 1][0];
    for (int j = 1; j < fruits.size() - 1; j++) {
      for (int i = std::max(j + 1, static_cast<int>(fruits.size()) - j - 1);
           i < fruits.size(); i++) {
        dp[i][j] = std::max({i + 1 < fruits.size() ? dp[i + 1][j - 1] : 0,
                             dp[i][j - 1], dp[i - 1][j - 1]}) +
                   fruits[i][j];
      }
    }

    return dp[fruits.size() - 1][fruits.size() - 2];
  }

  static int GetUpperRightChildMaxConnectCount(
      const std::vector<std::vector<int>>& fruits) {
    // dp[i][j] = std::max(dp[i-1][j+1], dp[i-1][j], dp[i-1][j-1]) +
    // fruits[i][j]
    std::vector<std::vector<int>> dp(fruits.size(),
                                     std::vector<int>(fruits.size(), 0));

    dp[0][fruits.size() - 1] = fruits[0][fruits.size() - 1];
    for (int i = 1; i < fruits.size() - 1; i++) {
      for (int j = std::max(i + 1, static_cast<int>(fruits.size()) - i - 1);
           j < fruits.size(); j++) {
        dp[i][j] = std::max({j + 1 < fruits.size() ? dp[i - 1][j + 1] : 0,
                             dp[i - 1][j], dp[i - 1][j - 1]}) +
                   fruits[i][j];
      }
    }

    return dp[fruits.size() - 2][fruits.size() - 1];
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxCollectedFruits(
      {{1, 2, 3, 4}, {5, 6, 8, 7}, {9, 10, 11, 12}, {13, 14, 15, 16}});
}
