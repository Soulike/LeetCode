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
    unordered_map<int, unordered_set<int>> neighbors;
    for (const auto& edge : edges) {
      neighbors[edge[0]].insert(edge[1]);
      neighbors[edge[1]].insert(edge[0]);
    }

    unordered_set<int> nodes;
    for (int i = 0; i < n; i++) {
      nodes.insert(i);
    }

    vector<int> leaves;
    while (nodes.size() > 2) {
      for (const auto& node : nodes) {
        if (neighbors[node].size() == 1) {
          leaves.push_back(node);
        }
      }

      for (const auto& leaf : leaves) {
        for (const auto& neighbor : neighbors[leaf]) {
          neighbors[neighbor].erase(leaf);
        }
        neighbors.erase(leaf);
        nodes.erase(leaf);
      }

      leaves.clear();
    }

    return vector<int>(nodes.cbegin(), nodes.cend());
  }
};
// @lc code=end
