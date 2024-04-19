/*
 * @lc app=leetcode id=200 lang=cpp
 *
 * [200] Number of Islands
 */
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int numIslands(vector<vector<char>>& grid) {
    int islandNumber = 0;
    for (int i = 0; i < grid.size(); i++) {
      for (int j = 0; j < grid[0].size(); j++) {
        if (grid[i][j] == LAND) {
          islandNumber++;
          flood(grid, i, j);
        }
      }
    }
    return islandNumber;
  }

 private:
  const char LAND = '1';
  const char WATER = '0';

  inline void flood(vector<vector<char>>& grid, int i, int j) {
    if ((i < 0 || i >= grid.size()) || (j < 0 || j >= grid[0].size()) ||
        grid[i][j] == WATER) {
      return;
    }
    grid[i][j] = WATER;
    flood(grid, i + 1, j);
    flood(grid, i - 1, j);
    flood(grid, i, j + 1);
    flood(grid, i, j - 1);
  }
};
// @lc code=end
