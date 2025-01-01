/*
 * @lc app=leetcode id=1823 lang=cpp
 *
 * [1823] Find the Winner of the Circular Game
 */
#include <queue>

// @lc code=start
class Solution {
 public:
  int findTheWinner(int n, int k) {
    std::queue<int> circle;
    for (int i = 1; i <= n; i++) {
      circle.push(i);
    }

    while (circle.size() > 1) {
      for (int i = 0; i < k - 1; i++) {
        circle.push(circle.front());
        circle.pop();
      }
      circle.pop();
    }

    return circle.front();
  }
};
// @lc code=end
