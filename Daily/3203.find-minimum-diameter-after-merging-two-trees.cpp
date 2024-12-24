/*
 * @lc app=leetcode id=3203 lang=cpp
 *
 * [3203] Find Minimum Diameter After Merging Two Trees
 */

#include <cmath>
#include <queue>
#include <unordered_map>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumDiameterAfterMerge(const std::vector<std::vector<int>>& edges1,
                                const std::vector<std::vector<int>>& edges2) {
    std::unordered_map<int, std::unordered_set<int>> tree1NodeToNeighbors =
        getNodeToNeighborsFromEdges(edges1);
    std::unordered_map<int, std::unordered_set<int>> tree2NodeToNeighbors =
        getNodeToNeighborsFromEdges(edges2);
    const int tree1Diameter = getDiameter(tree1NodeToNeighbors);
    const int tree2Diameter = getDiameter(tree2NodeToNeighbors);

    const int connectedDiameter =
        static_cast<int>(std::ceil(static_cast<double>(tree1Diameter) / 2) +
                         std::ceil(static_cast<double>(tree2Diameter) / 2)) +
        1;

    return std::max({tree1Diameter, tree2Diameter, connectedDiameter});
  }

 private:
  static int getDiameter(
      const std::unordered_map<int, std::unordered_set<int>>& nodeToNeighbors) {
    const int kNodeNumber = static_cast<int>(nodeToNeighbors.size());

    int diameter = 0;
    int remainingNodes = kNodeNumber;
    std::vector<int> nodeToDegrees(kNodeNumber);
    std::queue<int> leavesNodeQueue;

    for (const auto& nodeToNeighbor : nodeToNeighbors) {
      nodeToDegrees[nodeToNeighbor.first] =
          static_cast<int>(nodeToNeighbor.second.size());
    }

    for (int i = 0; i < kNodeNumber; i++) {
      if (nodeToDegrees[i] == 1) {
        leavesNodeQueue.push(i);
      }
    }

    while (remainingNodes > 2) {
      // Every time a layer of leaf nodes is removed, the tree loses 2 diameter.
      diameter += 2;
      std::vector<int> nodesToRemove;
      while (!leavesNodeQueue.empty()) {
        const int leafNode = leavesNodeQueue.front();
        leavesNodeQueue.pop();

        nodesToRemove.push_back(leafNode);
      }

      for (const int nodeToRemove : nodesToRemove) {
        nodeToDegrees[nodeToRemove]--;
        remainingNodes--;

        for (const int neighborNode : nodeToNeighbors.at(nodeToRemove)) {
          nodeToDegrees[neighborNode]--;

          // New leaf nodes must be produced after current leaf nodes are
          // removed.
          if (nodeToDegrees[neighborNode] == 1) {
            leavesNodeQueue.push(neighborNode);
          }
        }
      }
    }

    if (remainingNodes == 2) {
      diameter++;
    }
    return diameter;
  }

  static std::unordered_map<int, std::unordered_set<int>>
  getNodeToNeighborsFromEdges(const std::vector<std::vector<int>>& edges) {
    const int kNodeNumber = static_cast<int>(edges.size()) + 1;
    std::unordered_map<int, std::unordered_set<int>> nodeToNeighbors;
    for (int i = 0; i < kNodeNumber; i++) {
      nodeToNeighbors.insert({i, std::unordered_set<int>()});
    }

    for (const auto& edge : edges) {
      nodeToNeighbors[edge[0]].insert(edge[1]);
      nodeToNeighbors[edge[1]].insert(edge[0]);
    }

    return nodeToNeighbors;
  }
};
// @lc code=end

int main() {
  std::vector<std::vector<int>> edges1 = {};
  std::vector<std::vector<int>> edges2 = {};
  Solution sol;
  sol.minimumDiameterAfterMerge(edges1, edges2);
}
