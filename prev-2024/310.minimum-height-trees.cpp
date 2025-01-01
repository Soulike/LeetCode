/*
 * @lc app=leetcode id=310 lang=cpp
 *
 * [310] Minimum Height Trees
 */
#include <map>
#include <unordered_set>
#include <vector>

using std::unordered_map;
using std::unordered_set;
using std::vector;

// @lc code=start
class Solution {
 public:
  vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
    if (n == 1) {
      return {0};
    }

    unordered_map<int, unordered_set<int>> neighbors;
    for (const auto& edge : edges) {
      neighbors[edge[0]].insert(edge[1]);
      neighbors[edge[1]].insert(edge[0]);
    }

    vector<int> leaves;
    for (int i = 0; i < n; i++) {
      if (neighbors[i].size() == 1) {
        leaves.push_back(i);
      }
    }

    while (neighbors.size() > 2) {
      vector<int> newLeaves;
      for (const auto& leaf : leaves) {
        for (const auto& neighbor : neighbors[leaf]) {
          neighbors[neighbor].erase(leaf);
          if (neighbors[neighbor].size() == 1) {
            newLeaves.push_back(neighbor);
          }
        }
        neighbors.erase(leaf);
      }
      leaves = newLeaves;
    }

    return leaves;
  }
};
// @lc code=end
