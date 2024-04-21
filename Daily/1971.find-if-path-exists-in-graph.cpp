/*
 * @lc app=leetcode id=1971 lang=cpp
 *
 * [1971] Find if Path Exists in Graph
 */
#include <queue>
#include <unordered_map>
#include <unordered_set>
#include <vector>

using std::queue;
using std::unordered_map;
using std::unordered_set;
using std::vector;

// @lc code=start
class Solution {
 public:
  bool validPath(int n,
                 vector<vector<int>>& edges,
                 int source,
                 int destination) {
    unordered_map<int, vector<int>> edgeMap;
    for (auto& edge : edges) {
      edgeMap[edge[0]].push_back(edge[1]);
      edgeMap[edge[1]].push_back(edge[0]);
    }

    queue<int> nextNodes;
    unordered_set<int> visited;
    nextNodes.push(source);
    visited.insert(source);

    while (!nextNodes.empty()) {
      const int currentNextNodesLength = nextNodes.size();
      for (int i = 0; i < currentNextNodesLength; i++) {
        int node = nextNodes.front();
        nextNodes.pop();
        if (node == destination) {
          return true;
        }
        const vector<int>& neighbors = edgeMap[node];
        for (auto& neighbor : neighbors) {
          if (!visited.count(neighbor)) {
            if (neighbor == destination) {
              return true;
            }
            visited.insert(neighbor);
            nextNodes.push(neighbor);
          }
        }
      }
    }

    return false;
  }
};
// @lc code=end
