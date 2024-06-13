/*
 * @lc app=leetcode id=2037 lang=cpp
 *
 * [2037] Minimum Number of Moves to Seat Everyone
 */
#include <algorithm>
#include <cmath>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minMovesToSeat(std::vector<int>& seats, std::vector<int>& students) {
    std::sort(seats.begin(), seats.end());
    std::sort(students.begin(), students.end());

    const int N = seats.size();
    int minMoves = 0;
    for (int i = 0; i < N; i++) {
      minMoves += std::abs(seats[i] - students[i]);
    }

    return minMoves;
  }
};
// @lc code=end
