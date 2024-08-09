/*
 * @lc app=leetcode id=840 lang=cpp
 *
 * [840] Magic Squares In Grid
 */
#include <array>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int numMagicSquaresInside(std::vector<std::vector<int>>& grid) {
    const int ROWS = grid.size();
    const int COLS = grid[0].size();
    if (ROWS < 3 || COLS < 3) {
      return 0;
    }
    int magicSquareNumber = 0;
    for (int i = 0; i < ROWS - 2; i++) {
      for (int j = 0; j < COLS - 2; j++) {
        if (Solution::isMagicSquare(grid, i, j)) {
          magicSquareNumber++;
        }
      }
    }

    return magicSquareNumber;
  }

 private:
  static bool isMagicSquare(std::vector<std::vector<int>>& grid, int x, int y) {
    std::unordered_set<int> shouldExistNumbers = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    for (int i = x; i < x + 3; i++) {
      for (int j = y; j < y + 3; j++) {
        if (!shouldExistNumbers.contains(grid[i][j])) {
          return false;
        }
        shouldExistNumbers.erase(grid[i][j]);
      }
    }
    if (!shouldExistNumbers.empty()) {
      return false;
    }

    int diagonalSum = 0;
    int antidiagonalSum = 0;
    for (int i = 0; i < 3; i++) {
      if (grid[x + i][y + i] < 1 || grid[x + i][y + i] > 9 ||
          grid[x + i][y + 2 - i] < 1 || grid[x + i][y + 2 - i] > 9) {
        return false;
      }

      diagonalSum += grid[x + i][y + i];
      antidiagonalSum += grid[x + i][y + 2 - i];
    }
    if (diagonalSum != antidiagonalSum) {
      return false;
    }

    const int& expectedSum = diagonalSum;

    std::array<int, 3> rowSums{0};
    for (int i = x; i < x + 3; i++) {
      for (int j = y; j < y + 3; j++) {
        rowSums[i - x] += grid[i][j];
      }
      if (rowSums[i - x] != expectedSum) {
        return false;
      }
    }

    std::array<int, 3> colSums{0};
    for (int j = y; j < y + 3; j++) {
      for (int i = x; i < x + 3; i++) {
        colSums[j - y] += grid[i][j];
      }
      if (colSums[j - y] != expectedSum) {
        return false;
      }
    }

    return true;
  }
};
// @lc code=end
