/*
 * @lc app=leetcode id=2530 lang=cpp
 *
 * [2530] Maximal Score After Applying K Operations
 */
#include <cmath>
#include <queue>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long maxKelements(std::vector<int>& nums, int k) {
    std::priority_queue<int> pq(nums.cbegin(), nums.cend());
    long long score = 0;

    for (int i = 0; i < k; i++) {
      const int element = pq.top();
      pq.pop();
      score += element;
      pq.push(static_cast<int>(std::ceil(static_cast<double>(element) / 3)));
    }

    return score;
  }
};
// @lc code=end
