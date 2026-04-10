/*
 * @lc app=leetcode id=3740 lang=cpp
 *
 * [3740] Minimum Distance Between Three Equal Elements I
 */

#include <cmath>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumDistance(const std::vector<int>& nums) {
    std::unordered_map<int, std::vector<int>> num_to_indexes;
    for (int i = 0; i < nums.size(); i++) {
      num_to_indexes[nums[i]].push_back(i);
    }

    int min_distance = INT_MAX;

    for (const auto& [num, indexes] : num_to_indexes) {
      if (indexes.size() < 3) {
        continue;
      }
      for (int i = 0; i < indexes.size() - 2; i++) {
        const int distance = std::abs(indexes[i] - indexes[i + 1]) +
                             std::abs(indexes[i] - indexes[i + 2]) +
                             std::abs(indexes[i + 2] - indexes[i + 1]);
        min_distance = std::min(min_distance, distance);
      }
    }

    return min_distance == INT_MAX ? -1 : min_distance;
  }
};
// @lc code=end
