/*
 * @lc app=leetcode id=3531 lang=cpp
 *
 * [3531] Count Covered Buildings
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int countCoveredBuildings(const int n,
                            const std::vector<std::vector<int>>& buildings) {
    std::vector<int> min_x_in_col(n, INT_MAX);
    std::vector<int> max_x_in_col(n, INT_MIN);
    std::vector<int> min_y_in_row(n, INT_MAX);
    std::vector<int> max_y_in_row(n, INT_MIN);

    for (const std::vector<int>& building : buildings) {
      const int x = building[0] - 1;
      const int y = building[1] - 1;

      min_x_in_col[y] = std::min(min_x_in_col[y], x);
      max_x_in_col[y] = std::max(max_x_in_col[y], x);

      min_y_in_row[x] = std::min(min_y_in_row[x], y);
      max_y_in_row[x] = std::max(max_y_in_row[x], y);
    }

    int count = 0;

    for (const std::vector<int>& building : buildings) {
      const int x = building[0] - 1;
      const int y = building[1] - 1;

      const bool covered_in_row = min_y_in_row[x] < y && y < max_y_in_row[x];
      const bool covered_in_col = min_x_in_col[y] < x && x < max_x_in_col[y];

      count += covered_in_row && covered_in_col;
    }

    return count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countCoveredBuildings(3, {{1, 1}, {1, 2}, {3, 2}, {2, 1}, {2, 2}});
}
