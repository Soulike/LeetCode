/*
 * @lc app=leetcode id=2684 lang=cpp
 *
 * [2684] Maximum Number of Moves in a Grid
 */
#include <vector>

// @lc code=start
class Coordinate {
 public:
  int row;
  int column;
};

class Solution {
 public:
  int maxMoves(std::vector<std::vector<int>>& grid) {
    std::vector<std::vector<int>> memo(grid.size(),
                                       std::vector<int>(grid[0].size(), -1));
    for (int i = 0; i < grid.size(); i++) {
      dp(grid, memo, {i, 0});
    }

    int maxSteps = 0;
    for (int i = 0; i < grid.size(); i++) {
      maxSteps = std::max(memo[i][0], maxSteps);
    }

    return maxSteps;
  }

 private:
  int dp(std::vector<std::vector<int>>& grid,
         std::vector<std::vector<int>>& memo,
         Coordinate currentCoordinate) {
    if (currentCoordinate.column == grid[0].size() - 1) {
      return 0;
    }

    if (memo[currentCoordinate.row][currentCoordinate.column] != -1) {
      return memo[currentCoordinate.row][currentCoordinate.column];
    }

    const int currentValue =
        grid[currentCoordinate.row][currentCoordinate.column];
    int maxSteps = 0;

    // Try to move up right
    if (currentCoordinate.row > 0 &&
        grid[currentCoordinate.row - 1][currentCoordinate.column + 1] >
            currentValue) {
      maxSteps = std::max(maxSteps, 1 + dp(grid, memo,
                                           {currentCoordinate.row - 1,
                                            currentCoordinate.column + 1}));
    }

    // Try to move down right
    if (currentCoordinate.row < grid.size() - 1 &&
        grid[currentCoordinate.row + 1][currentCoordinate.column + 1] >
            currentValue) {
      maxSteps = std::max(maxSteps, 1 + dp(grid, memo,
                                           {currentCoordinate.row + 1,
                                            currentCoordinate.column + 1}));
    }

    // Try to move right
    if (grid[currentCoordinate.row][currentCoordinate.column + 1] >
        currentValue) {
      maxSteps = std::max(maxSteps, 1 + dp(grid, memo,
                                           {currentCoordinate.row,
                                            currentCoordinate.column + 1}));
    }

    memo[currentCoordinate.row][currentCoordinate.column] = maxSteps;
    return maxSteps;
  }
};
// @lc code=end

int main() {
  std::vector<std::vector<int>> grid = {
      {2, 4, 3, 5}, {5, 4, 9, 3}, {3, 4, 2, 11}, {10, 9, 13, 15}};
  Solution sol;
  sol.maxMoves(grid);
}
