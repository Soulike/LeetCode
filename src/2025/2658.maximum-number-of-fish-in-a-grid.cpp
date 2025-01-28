/*
 * @lc app=leetcode id=2658 lang=cpp
 *
 * [2658] Maximum Number of Fish in a Grid
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int findMaxFish(std::vector<std::vector<int>>& grid) {
    const int kGridRowNumber = static_cast<int>(grid.size());
    const int kGridColNumber = static_cast<int>(grid[0].size());

    int maxFishesNumber = 0;
    for (int i = 0; i < kGridRowNumber; i++) {
      for (int j = 0; j < kGridColNumber; j++) {
        if (grid[i][j] != 0) {
          maxFishesNumber =
              std::max(maxFishesNumber, getAllFishesInPool(grid, {i, j}));
        }
      }
    }

    return maxFishesNumber;
  }

 private:
  class Coordinate {
   public:
    int x;
    int y;
  };

  /**
   * Remove all the fishes in pool, and return the number of fishes.
   */
  static int getAllFishesInPool(std::vector<std::vector<int>>& grid,
                                const Coordinate& poolCellCoordinate) {
    const int kGridRowNumber = static_cast<int>(grid.size());
    const int kGridColNumber = static_cast<int>(grid[0].size());

    if (poolCellCoordinate.x < 0 || poolCellCoordinate.x > kGridRowNumber - 1 ||
        poolCellCoordinate.y < 0 || poolCellCoordinate.y > kGridColNumber - 1) {
      return 0;
    }

    if (grid[poolCellCoordinate.x][poolCellCoordinate.y] == 0) {
      return 0;
    }

    int fishesNumber = grid[poolCellCoordinate.x][poolCellCoordinate.y];
    grid[poolCellCoordinate.x][poolCellCoordinate.y] = 0;

    fishesNumber +=
        getAllFishesInPool(grid,
                           {poolCellCoordinate.x + 1, poolCellCoordinate.y}) +
        getAllFishesInPool(grid,
                           {poolCellCoordinate.x - 1, poolCellCoordinate.y}) +
        getAllFishesInPool(grid,
                           {poolCellCoordinate.x, poolCellCoordinate.y + 1}) +
        getAllFishesInPool(grid,
                           {poolCellCoordinate.x, poolCellCoordinate.y - 1});
    return fishesNumber;
  }
};
// @lc code=end
