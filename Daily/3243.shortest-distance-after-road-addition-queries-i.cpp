/*
 * @lc app=leetcode id=3243 lang=cpp
 *
 * [3243] Shortest Distance After Road Addition Queries I
 */
#include <queue>
#include <unordered_map>
#include <unordered_set>
#include <vector>

// @lc code=start
class NodeInQueue {
 public:
  int node;
  int steps;
};

class Solution {
 public:
  std::vector<int> shortestDistanceAfterQueries(
      int n,
      std::vector<std::vector<int>>& queries) {
    std::unordered_map<int, std::vector<int>> nodeToNeighbors;
    for (int i = 0; i < n - 1; i++) {
      nodeToNeighbors[i].push_back(i + 1);
    }
    nodeToNeighbors[n - 1];

    std::vector<int> results;

    for (const auto& query : queries) {
      nodeToNeighbors[query[0]].push_back(query[1]);
      const int shortestPath = getShortestPath(0, n - 1, nodeToNeighbors);
      results.push_back(shortestPath);
    }

    return results;
  }

 private:
  int getShortestPath(
      const int sourceNode,
      const int targetNode,
      const std::unordered_map<int, std::vector<int>>& nodeToNeighbors) {
    std::queue<NodeInQueue> queue;
    std::unordered_set<int> visited;
    queue.emplace(sourceNode, 0);

    while (!queue.empty()) {
      const NodeInQueue nodeInQueue = queue.front();
      queue.pop();

      if (nodeInQueue.node == targetNode) {
        return nodeInQueue.steps;
      }

      const std::vector<int>& frontQueueNodeNeighbors =
          nodeToNeighbors.at(nodeInQueue.node);
      for (const int neighbor : frontQueueNodeNeighbors) {
        if (!visited.contains(neighbor)) {
          visited.insert(neighbor);
          queue.emplace(neighbor, nodeInQueue.steps + 1);
        }
      }
    }

    return -1;
  }
};

// @lc code=end

int main() {
  Solution sol;
  std::vector<std::vector<int>> queries = {{2, 4}, {0, 2}, {0, 4}};
  sol.shortestDistanceAfterQueries(5, queries);
}
