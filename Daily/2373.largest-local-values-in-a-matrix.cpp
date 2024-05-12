/*
 * @lc app=leetcode id=2373 lang=cpp
 *
 * [2373] Largest Local Values in a Matrix
 */

#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  vector<vector<int>> largestLocal(vector<vector<int>>& grid) {
    const int N = grid.size();

    vector<vector<int>> result;
    result.reserve(N - 2);
    for (int i = 0; i + 2 < N; i++) {
      vector<int> maxLocalRow;
      maxLocalRow.reserve(N - 2);
      for (int j = 0; j + 2 < N; j++) {
        int maxLocal = getMaxLocal(grid, i, j);
        maxLocalRow.push_back(maxLocal);
      }

      result.push_back(maxLocalRow);
    }

    return result;
  }

  int getMaxLocal(vector<vector<int>>& grid, int x, int y) {
    int maxLocal = -1;
    for (int i = 0; i < 3; i++) {
      for (int j = 0; j < 3; j++) {
        maxLocal = std::max(maxLocal, grid[x + i][y + j]);
      }
    }
    return maxLocal;
  }
};
// @lc code=end
