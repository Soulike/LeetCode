/*
 * @lc app=leetcode id=1701 lang=cpp
 *
 * [1701] Average Waiting Time
 */
#include <vector>

// @lc code=start
class Solution {
 public:
  double averageWaitingTime(std::vector<std::vector<int>>& customers) {
    int currentTime = customers[0][0];
    double averageWaitingTime = 0;
    const int N = customers.size();

    for (const auto& customer : customers) {
      const int arrivalTime = customer[0];
      const int waitingTime = customer[1];

      if (arrivalTime <= currentTime) {
        averageWaitingTime +=
            static_cast<double>((currentTime - arrivalTime) + waitingTime) / N;
        currentTime += waitingTime;
      } else {
        averageWaitingTime += static_cast<double>(waitingTime) / N;
        currentTime = arrivalTime + waitingTime;
      }
    }

    return averageWaitingTime;
  }
};
// @lc code=end
