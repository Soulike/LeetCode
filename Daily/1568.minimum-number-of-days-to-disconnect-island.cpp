/*
 * @lc app=leetcode id=1568 lang=cpp
 *
 * [1568] Minimum Number of Days to Disconnect Island
 */
#include <vector>

// @lc code=start
class Solution {
 public:
  int minDays(std::vector<std::vector<int>>& grid) {
    int islandNum = getNumOfIslands(grid);

    if (islandNum != 1) {
      return 0;
    }

    for (int i = 0; i < grid.size(); i++) {
      for (int j = 0; j < grid[0].size(); j++) {
        if (grid[i][j] == LAND) {
          grid[i][j] = FLOODED_LAND;
          islandNum = getNumOfIslands(grid);
          if (islandNum != 1) {
            return 1;
          }
          grid[i][j] = LAND;
        }
      }
    }
    return 2;
  }

 private:
  const int WATER = 0;
  const int LAND = 1;
  const int FLOODED_LAND = 2;

  int getNumOfIslands(std::vector<std::vector<int>>& grid) {
    int islandNum = 0;
    for (int i = 0; i < grid.size(); i++) {
      for (int j = 0; j < grid[0].size(); j++) {
        if (grid[i][j] == LAND) {
          islandNum++;
          flood(grid, i, j);
        }
      }
    }

    unflood(grid);

    return islandNum;
  }

  void flood(std::vector<std::vector<int>>& grid, int x, int y) {
    if (x < 0 || x >= grid.size() || y < 0 || y >= grid[0].size() ||
        grid[x][y] != LAND) {
      return;
    }

    grid[x][y] = FLOODED_LAND;
    flood(grid, x - 1, y);
    flood(grid, x + 1, y);
    flood(grid, x, y - 1);
    flood(grid, x, y + 1);
  }

  void unflood(std::vector<std::vector<int>>& grid) {
    for (int i = 0; i < grid.size(); i++) {
      for (int j = 0; j < grid[0].size(); j++) {
        if (grid[i][j] == FLOODED_LAND) {
          grid[i][j] = LAND;
        }
      }
    }
  }
};
// @lc code=end
