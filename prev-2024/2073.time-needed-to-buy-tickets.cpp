/*
 * @lc app=leetcode id=2073 lang=cpp
 *
 * [2073] Time Needed to Buy Tickets
 */
#include <cmath>
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int timeRequiredToBuy(vector<int>& tickets, int k) {
    int time = 0;
    for (int i = 0; i < tickets.size(); i++) {
      if (i <= k) {
        time += std::min(tickets[i], tickets[k]);
      } else {
        // People after `k` will not contribute
        // after people `k` finish buying `tickets[k]`,
        // contributing `tickets[k] - 1` time at maximum
        time += std::min(tickets[i], tickets[k] - 1);
      }
    }

    return time;
  }
};
// @lc code=end
