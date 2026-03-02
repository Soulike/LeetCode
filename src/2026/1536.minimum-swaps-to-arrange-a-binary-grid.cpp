/*
 * @lc app=leetcode id=1536 lang=cpp
 *
 * [1536] Minimum Swaps to Arrange a Binary Grid
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int minSwaps(std::vector<std::vector<int>>& grid) {
    std::vector<int> last_one_indexes(grid.size());
    for (int i = 0; i < grid.size(); i++) {
      const std::vector<int>& row = grid[i];
      for (int j = row.size() - 1; j >= 0; j--) {
        if (row[j] == 1) {
          last_one_indexes[i] = j;
          break;
        }
      }
    }

    int min_swap_count = 0;
    for (int i = 0; i < grid.size(); i++) {
      int found_index = -1;
      for (int j = i; j < grid.size(); j++) {
        if (last_one_indexes[j] <= i) {
          found_index = j;
          break;
        }
      }
      if (found_index != -1) {
        min_swap_count += found_index - i;
        for (int j = found_index; j > i; --j) {
          std::swap(last_one_indexes[j], last_one_indexes[j - 1]);
        }
      } else {
        return -1;
      }
    }

    return min_swap_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::vector<int>> grid = {{0, 0, 1}, {1, 1, 0}, {1, 0, 0}};
  sol.minSwaps(grid);
}
