/*
 * @lc app=leetcode id=3066 lang=cpp
 *
 * [3066] Minimum Operations to Exceed Threshold Value II
 */

#include <cinttypes>
#include <queue>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minOperations(const std::vector<int>& nums, const int k) {
    int operation = 0;
    std::priority_queue<std::int64_t, std::vector<std::int64_t>,
                        std::greater_equal<>>
        minPq(nums.cbegin(), nums.cend());
    while (minPq.top() < k) {
      operation++;
      const std::int64_t minNum1 = minPq.top();
      minPq.pop();
      const std::int64_t minNum2 = minPq.top();
      minPq.pop();
      minPq.push(minNum1 * 2 + minNum2);
    }

    return operation;
  }
};
// @lc code=end
