/*
 * @lc app=leetcode id=3536 lang=cpp
 *
 * [3536] Maximum Product of Two Digits
 */

#include <queue>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxProduct(int n) {
    std::priority_queue<int, std::vector<int>, std::greater<>> pq{
        std::greater<>()};
    while (n > 0) {
      pq.push(n % 10);
      n /= 10;

      if (pq.size() > 2) {
        pq.pop();
      }
    }

    const int digit1 = pq.top();
    pq.pop();
    const int digit2 = pq.top();
    pq.pop();

    return digit1 * digit2;
  }
};
// @lc code=end
