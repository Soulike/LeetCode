/*
 * @lc app=leetcode id=1905 lang=cpp
 *
 * [1905] Count Sub Islands
 */
#include <vector>

// @lc code=start
class Solution {
 public:
  int countSubIslands(std::vector<std::vector<int>>& grid1,
                      std::vector<std::vector<int>>& grid2) {
    int islandCount = 0;
    for (int i = 0; i < grid2.size(); i++) {
      for (int j = 0; j < grid2[0].size(); j++) {
        if (grid2[i][j] == LAND) {
          bool isSubIsland = floodAndCheck(grid1, grid2, i, j);
          if (isSubIsland) {
            islandCount++;
          }
        }
      }
    }

    return islandCount;
  }

 private:
  static const int WATER = 0;
  static const int LAND = 1;

  bool floodAndCheck(std::vector<std::vector<int>>& grid1,
                     std::vector<std::vector<int>>& grid2,
                     int x,
                     int y) {
    if (x < 0 || x >= grid2.size() || y < 0 || y >= grid2[0].size() ||
        grid2[x][y] == WATER) {
      return true;
    }

    grid2[x][y] = WATER;
    bool upResult = floodAndCheck(grid1, grid2, x - 1, y);
    bool downResult = floodAndCheck(grid1, grid2, x + 1, y);
    bool leftResult = floodAndCheck(grid1, grid2, x, y - 1);
    bool rightResult = floodAndCheck(grid1, grid2, x, y + 1);

    bool isPartOfSubIsland = grid1[x][y] == LAND;
    isPartOfSubIsland = isPartOfSubIsland && upResult && downResult &&
                        leftResult && rightResult;
    return isPartOfSubIsland;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::vector<int>> grid1 = {{1, 1, 1, 0, 0},
                                         {0, 1, 1, 1, 1},
                                         {0, 0, 0, 0, 0},
                                         {1, 0, 0, 0, 0},
                                         {1, 1, 0, 1, 1}};
  std::vector<std::vector<int>> grid2 = {{1, 1, 1, 0, 0},
                                         {0, 0, 1, 1, 1},
                                         {0, 1, 0, 0, 0},
                                         {1, 0, 1, 1, 0},
                                         {0, 1, 0, 1, 0}};
  sol.countSubIslands(grid1, grid2);
}
