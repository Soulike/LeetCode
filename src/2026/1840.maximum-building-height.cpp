/*
 * @lc app=leetcode id=1840 lang=cpp
 *
 * [1840] Maximum Building Height
 */

#include <algorithm>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxBuilding(const int n, std::vector<std::vector<int>>& restrictions) {
    restrictions.push_back({1, 0});
    std::ranges::sort(restrictions, [](const std::vector<int>& restriction1,
                                       const std::vector<int>& restriction2) {
      return restriction1[0] < restriction2[0];
    });
    if (restrictions.back()[0] != n) {
      restrictions.push_back({n, n - 1});
    }

    // Now the max heights in restrictions are not actual max possible heights
    // of the buildings. We need to calculate actual max possible heights.

    // From left to right, we calculate the actual max possible heights of next
    // restricted building based on current restricted building.
    for (int i = 0; i < restrictions.size() - 1; i++) {
      restrictions[i + 1][1] = std::min(
          restrictions[i + 1][1],
          restrictions[i][1] + (restrictions[i + 1][0] - restrictions[i][0]));
    }

    // Again, from right to left
    for (int i = restrictions.size() - 2; i >= 0; i--) {
      restrictions[i][1] = std::min(
          restrictions[i][1], restrictions[i + 1][1] + (restrictions[i + 1][0] -
                                                        restrictions[i][0]));
    }

    // Now restrictions contains actual max possible heights of the buildings.

    int max_height = 0;
    for (int i = 0; i < restrictions.size() - 1; i++) {
      // For every building i between restricted buildings a and b,
      // We need to fulfill
      // height[a] + (i - a) >= height[i]
      // height[b] + (b - i) >= height[i]
      // => height[a] + height[b] + (i - a) + (b - i) >= 2 * height[i]
      // => height[a] + height[b] + b - a >= 2 * height[i]
      // => (height[a] + height[b] + b - a) / 2 >= height[i]
      // So the maximum value of height[i] is
      // floor((height[a] + height[b] + b - a) / 2).
      max_height =
          std::max(max_height, ((restrictions[i + 1][0] - restrictions[i][0]) +
                                restrictions[i + 1][1] + restrictions[i][1]) /
                                   2);
    }

    return max_height;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::vector<int>> restrictions = {
      {5, 3}, {2, 5}, {7, 4}, {10, 3}};
  sol.maxBuilding(10, restrictions);
}
