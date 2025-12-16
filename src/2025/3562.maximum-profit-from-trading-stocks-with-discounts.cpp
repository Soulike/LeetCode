/*
 * @lc app=leetcode id=3562 lang=cpp
 *
 * [3562] Maximum Profit from Trading Stocks with Discounts
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxProfit(const int n,
                const std::vector<int>& present,
                const std::vector<int>& future,
                const std::vector<std::vector<int>>& hierarchy,
                const int budget) {
    std::vector<std::vector<int>> children(n + 1);
    for (const auto& relation : hierarchy) {
      children[relation[0]].push_back(relation[1]);
    }

    // dp[node][b][parent_bought] = 用 b 预算在以 node
    // 为根的子树能获得的最大收益
    std::vector<std::vector<std::vector<int>>> dp(
        n + 1,
        std::vector<std::vector<int>>(budget + 1, std::vector<int>(2, 0)));

    dfs(1, present, future, children, budget, dp);

    return dp[1][budget][0];
  }

 private:
  // 后序遍历，计算 dp[node] 的值
  // 输出: dp[node] = 用 b 预算在以 node 为根的子树能获得的最大收益
  static void dfs(const int node,
                  const std::vector<int>& present,
                  const std::vector<int>& future,
                  const std::vector<std::vector<int>>& children,
                  const int budget,
                  std::vector<std::vector<std::vector<int>>>& dp) {
    // 先递归处理所有子节点，得到所有 dp[child]
    for (const int child : children[node]) {
      dfs(child, present, future, children, budget, dp);
    }

    // childWithDiscount[b]: 当前节点购买股票时，所有子树用 b
    // 预算能获得的最大收益
    // （子节点享受折扣，因为 parent_bought = true）
    std::vector<int> childWithDiscount(budget + 1, 0);
    // childWithoutDiscount[b]: 当前节点不购买股票时，所有子树用 b
    // 预算能获得的最大收益
    // （子节点无折扣，因为 parent_bought = false）
    std::vector<int> childWithoutDiscount(budget + 1, 0);

    for (const int child : children[node]) {
      // 合并当前子树到 childWithDiscount
      // 枚举：总预算 b，给当前子树分配 k，给之前子树分配 b-k
      std::vector<int> childWithDiscountTemp(budget + 1, 0);
      for (int b = 0; b <= budget; b++) {
        for (int k = 0; k <= b; k++) {
          childWithDiscountTemp[b] =
              std::max(childWithDiscountTemp[b],
                       childWithDiscount[b - k] + dp[child][k][1]);
        }
      }
      childWithDiscount = std::move(childWithDiscountTemp);

      // 合并当前子树到 childWithoutDiscount
      std::vector<int> childWithoutDiscountTemp(budget + 1, 0);
      for (int b = 0; b <= budget; b++) {
        for (int k = 0; k <= b; k++) {
          childWithoutDiscountTemp[b] =
              std::max(childWithoutDiscountTemp[b],
                       childWithoutDiscount[b - k] + dp[child][k][0]);
        }
      }
      childWithoutDiscount = std::move(childWithoutDiscountTemp);
    }

    // 计算当前节点的 dp 值（两种情况：父节点买/不买）
    for (int parent_bought = 0; parent_bought <= 1; parent_bought++) {
      const int cost =
          parent_bought ? present[node - 1] / 2 : present[node - 1];
      const int profit = future[node - 1] - cost;

      for (int j = 0; j <= budget; j++) {
        // 选择1：不买当前节点
        dp[node][j][parent_bought] = childWithoutDiscount[j];

        // 选择2：买当前节点
        if (j >= cost) {
          dp[node][j][parent_bought] = std::max(
              dp[node][j][parent_bought], profit + childWithDiscount[j - cost]);
        }
      }
    }
  }
};
// @lc code=end
