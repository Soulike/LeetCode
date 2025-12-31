/*
 * @lc app=leetcode id=1970 lang=cpp
 *
 * [1970] Last Day Where You Can Still Cross
 */

#include <queue>
#include <vector>

// @lc code=start
class Solution {
 public:
  int latestDayToCross(const int row,
                       const int col,
                       const std::vector<std::vector<int>>& cells) {
    int left = 0;
    int right = cells.size() + 1;
    while (left < right) {
      const int mid = (right - left) / 2 + left;
      const bool can_walk_through = CanWalkThrough(row, col, cells, mid);
      if (can_walk_through) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left - 1;
  }

 private:
  struct Coordinate {
    int x;
    int y;
  };

  static std::vector<std::vector<bool>> BuildMatrix(
      const int row,
      const int col,
      const std::vector<std::vector<int>>& cells,
      const int day) {
    // matrix[i][j] - Can we step on it.
    std::vector<std::vector<bool>> matrix(row, std::vector<bool>(col, true));
    for (int i = 0; i < day; i++) {
      const int x = cells[i][0] - 1;
      const int y = cells[i][1] - 1;
      matrix[x][y] = false;
    }
    return matrix;
  }

  static bool CanWalkThrough(const int row,
                             const int col,
                             const std::vector<std::vector<int>>& cells,
                             const int day) {
    std::vector<std::vector<bool>> matrix = BuildMatrix(row, col, cells, day);
    std::queue<Coordinate> queue;

    for (int j = 0; j < matrix[0].size(); j++) {
      if (!matrix[0][j]) {
        continue;
      }

      queue.push({0, j});
      matrix[0][j] = false;
    }

    while (!queue.empty()) {
      const auto [x, y] = queue.front();
      queue.pop();
      if (x - 1 >= 0 && matrix[x - 1][y]) {
        matrix[x - 1][y] = false;
        queue.push({x - 1, y});
      }
      if (x + 1 < matrix.size() && matrix[x + 1][y]) {
        if (x + 1 == matrix.size() - 1) {
          return true;
        }
        matrix[x + 1][y] = false;
        queue.push({x + 1, y});
      }
      if (y - 1 >= 0 && matrix[x][y - 1]) {
        matrix[x][y - 1] = false;
        queue.push({x, y - 1});
      }
      if (y + 1 < matrix[0].size() && matrix[x][y + 1]) {
        matrix[x][y + 1] = false;
        queue.push({x, y + 1});
      }
    }

    return false;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.latestDayToCross(2, 2, {{1, 1}, {2, 1}, {1, 2}, {2, 2}});
}
