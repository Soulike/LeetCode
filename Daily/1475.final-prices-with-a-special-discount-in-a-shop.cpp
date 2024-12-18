/*
 * @lc app=leetcode id=1475 lang=cpp
 *
 * [1475] Final Prices With a Special Discount in a Shop
 */

#include <stack>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> finalPrices(const std::vector<int>& prices) {
    std::vector<int> pricesAfterDiscount = prices;
    std::stack<int> IncreasingIndexStack;
    for (int i = 0; i < prices.size(); i++) {
      while (!IncreasingIndexStack.empty() &&
             prices[IncreasingIndexStack.top()] >= prices[i]) {
        const int topIndex = IncreasingIndexStack.top();
        IncreasingIndexStack.pop();
        pricesAfterDiscount[topIndex] = prices[topIndex] - prices[i];
      }
      IncreasingIndexStack.push(i);
    }

    return pricesAfterDiscount;
  }
};

// @lc code=end
