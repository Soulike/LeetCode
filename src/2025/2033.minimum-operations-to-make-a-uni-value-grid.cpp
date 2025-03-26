/*
 * @lc app=leetcode id=2033 lang=cpp
 *
 * [2033] Minimum Operations to Make a Uni-Value Grid
 */

#include <algorithm>
#include <cmath>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minOperations(const std::vector<std::vector<int>>& grid, const int x) {
    const int M = static_cast<int>(grid.size());
    const int N = static_cast<int>(grid[0].size());

    const int expectedRemainder = grid[0][0] % x;
    std::vector<int> allNums;
    allNums.reserve(M * N);

    for (int i = 0; i < M; i++) {
      for (int j = 0; j < N; j++) {
        const int num = grid[i][j];
        if (num % x != expectedRemainder) {
          return -1;
        }
        allNums.push_back(num);
      }
    }

    std::sort(allNums.begin(), allNums.end());

    const int targetNum = allNums[allNums.size() / 2];

    int operationNumber = 0;
    for (const int num : allNums) {
      operationNumber += std::abs(num - targetNum) / x;
    }

    return operationNumber;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minOperations({{2, 4}, {6, 8}}, 2);
}
