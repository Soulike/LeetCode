/*
 * @lc app=leetcode id=3567 lang=cpp
 *
 * [3567] Minimum Absolute Difference in Sliding Submatrix
 */

#include <algorithm>
#include <set>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::vector<int>> minAbsDiff(
      const std::vector<std::vector<int>>& grid,
      const int k) {
    std::vector<std::vector<int>> result(
        grid.size() - k + 1, std::vector<int>(grid[0].size() - k + 1));
    for (int i = 0; i < result.size(); i++) {
      for (int j = 0; j < result[0].size(); j++) {
        result[i][j] = GetMatrixMinAbsDiff(grid, k, i, j);
      }
    }
    return result;
  }

 private:
  static int GetMatrixMinAbsDiff(const std::vector<std::vector<int>>& grid,
                                 const int k,
                                 const int x,
                                 const int y) {
    std::vector<int> nums;
    nums.reserve(k * k);
    for (int i = x; i < x + k; i++) {
      for (int j = y; j < y + k; j++) {
        nums.push_back(grid[i][j]);
      }
    }

    std::ranges::sort(nums);

    int min_abs_diff = INT_MAX;
    for (int i = 1; i < nums.size(); i++) {
      if (nums[i - 1] == nums[i]) {
        continue;
      }
      min_abs_diff = std::min(min_abs_diff, nums[i] - nums[i - 1]);
    }
    return min_abs_diff == INT_MAX ? 0 : min_abs_diff;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minAbsDiff({{1, -2, 3}, {2, 3, 5}}, 2);
}
