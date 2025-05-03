/*
 * @lc app=leetcode id=1007 lang=cpp
 *
 * [1007] Minimum Domino Rotations For Equal Row
 */

#include <algorithm>
#include <array>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minDominoRotations(const std::vector<int>& tops,
                         const std::vector<int>& bottoms) {
    std::array<int, 6> num_counts{};
    std::ranges::fill(num_counts, 0);
    const int kDominoCount = static_cast<int>(tops.size());
    for (int i = 0; i < kDominoCount; i++) {
      num_counts[tops[i] - 1]++;
      if (bottoms[i] != tops[i]) {
        num_counts[bottoms[i] - 1]++;
      }
    }
    int min_rotations = INT_MAX;
    for (int i = 0; i < 6; i++) {
      if (num_counts[i] < kDominoCount) {
        continue;
      }
      const int num = i + 1;
      int move_to_bottom_rotations = 0;
      int move_to_top_rotaions = 0;
      for (int j = 0; j < kDominoCount; j++) {
        if (tops[j] == bottoms[j]) {
          continue;
        }
        if (tops[j] != num && bottoms[j] != num) {
          continue;
        }
        move_to_bottom_rotations += tops[j] == num;
        move_to_top_rotaions += bottoms[j] == num;
      }
      min_rotations = std::min(
          {min_rotations, move_to_bottom_rotations, move_to_top_rotaions});
    }

    return min_rotations == INT_MAX ? -1 : min_rotations;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minDominoRotations({2, 1, 2, 4, 2, 2}, {5, 2, 6, 2, 3, 2});
}
