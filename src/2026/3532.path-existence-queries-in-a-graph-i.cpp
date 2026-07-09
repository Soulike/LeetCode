/*
 * @lc app=leetcode id=3532 lang=cpp
 *
 * [3532] Path Existence Queries in a Graph I
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<bool> pathExistenceQueries(
      const int n,
      const std::vector<int>& nums,
      const int maxDiff,
      const std::vector<std::vector<int>>& queries) {
    std::vector<int> components(n, -1);
    int current_component = 0;
    components[0] = current_component;

    for (int i = 1; i < nums.size(); i++) {
      if (std::abs(nums[i - 1] - nums[i]) <= maxDiff) {
        components[i] = components[i - 1];
      } else {
        current_component++;
        components[i] = current_component;
      }
    }

    std::vector<bool> results;
    results.reserve(queries.size());
    for (const std::vector<int>& query : queries) {
      results.push_back(components[query[0]] == components[query[1]]);
    }
    return results;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.pathExistenceQueries(4, {20332, 35890, 89372, 98493}, 53939,
                           {{0, 3}, {3, 1}, {1, 2}, {0, 3}, {2, 0}});
}
