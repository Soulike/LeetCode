/*
 * @lc app=leetcode id=463 lang=cpp
 *
 * [463] Island Perimeter
 */
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int islandPerimeter(vector<vector<int>>& grid) {
    int perimeter = 0;
    const int M = grid.size();
    const int N = grid[0].size();
    const int WATER = 0;
    const int LAND = 1;

    for (int i = 0; i < M; i++) {
      for (int j = 0; j < N; j++) {
        if (grid[i][j] == LAND) {
          if (i - 1 < 0 || grid[i - 1][j] == WATER) {
            perimeter++;
          }
          if (i + 1 >= M || grid[i + 1][j] == WATER) {
            perimeter++;
          }
          if (j - 1 < 0 || grid[i][j - 1] == WATER) {
            perimeter++;
          }
          if (j + 1 >= N || grid[i][j + 1] == WATER) {
            perimeter++;
          }
        }
      }
    }

    return perimeter;
  }
};
// @lc code=end
