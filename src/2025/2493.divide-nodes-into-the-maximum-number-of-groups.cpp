/*
 * @lc app=leetcode id=2493 lang=cpp
 *
 * [2493] Divide Nodes Into the Maximum Number of Groups
 */

#include <memory>
#include <numeric>
#include <queue>
#include <unordered_map>
#include <vector>

// @lc code=start
class UnionFindSet {
 public:
  using ElementType = size_t;

  UnionFindSet(const size_t size) {
    parents_.resize(size);
    for (int i = 0; i < parents_.size(); i++) {
      parents_[i] = i;
    }
  }

  void doUnion(const ElementType element1, const ElementType element2) {
    const ElementType element1RootElement = doFind(element1);
    const ElementType element2RootElement = doFind(element2);
    if (element1RootElement == element2RootElement) {
      return;
    }
    parents_[element2RootElement] = element1RootElement;
  }

  ElementType doFind(const ElementType element) {
    if (parents_[element] == element) {
      return element;
    }

    const ElementType rootElement = doFind(parents_[element]);
    parents_[element] = rootElement;
    return rootElement;
  }

  bool isInSameSet(const ElementType element1, const ElementType element2) {
    return doFind(element1) == doFind(element2);
  }

 private:
  std::vector<ElementType> parents_;
};

class Solution {
 public:
  int magnificentSets(int n, std::vector<std::vector<int>>& edges) {
    UnionFindSet ufSet = getGraphUnionFindSet(n, edges);
    std::vector<int> setNumberOfComponents(n, 0);

    const std::vector<std::vector<int>> adjacencyList =
        getAdjacencyList(n, edges);
    for (int i = 0; i < n; i++) {
      const int maximumSetNumberFromNode =
          getMaximumSetNumberFromNode(i, adjacencyList);
      if (maximumSetNumberFromNode == -1) {
        return -1;
      }
      const auto componentRootElement = ufSet.doFind(i);
      setNumberOfComponents[componentRootElement] =
          std::max(setNumberOfComponents[componentRootElement],
                   maximumSetNumberFromNode);
    }

    return std::accumulate(setNumberOfComponents.cbegin(),
                           setNumberOfComponents.cend(), 0,
                           [](int a, int b) { return a + b; });
  }

 private:
  // Note: Converts nodes to start from 0 instead of 1.
  static std::vector<std::vector<int>> getAdjacencyList(
      const int nodeNumber,
      const std::vector<std::vector<int>>& edges) {
    std::vector<std::vector<int>> adjacencyList(nodeNumber, std::vector<int>());

    for (const std::vector<int>& edge : edges) {
      adjacencyList[edge[0] - 1].push_back(edge[1] - 1);
      adjacencyList[edge[1] - 1].push_back(edge[0] - 1);
    }

    return adjacencyList;
  }

  // Note: Converts nodes to start from 0 instead of 1.
  static UnionFindSet getGraphUnionFindSet(
      const int nodeNumber,
      const std::vector<std::vector<int>>& edges) {
    UnionFindSet ufSet(nodeNumber);
    for (const std::vector<int>& edge : edges) {
      const int node1 = edge[0] - 1;
      const int node2 = edge[1] - 1;
      ufSet.doUnion(node1, node2);
    }

    return ufSet;
  }

  static int getMaximumSetNumberFromNode(
      const int startingNode,
      const std::vector<std::vector<int>>& adjacencyList) {
    std::queue<int> nodeQueue;
    std::unordered_map<int, int> nodeToLayer;
    int currentLayer = 0;
    nodeToLayer.insert({startingNode, 0});
    nodeQueue.push(startingNode);

    while (!nodeQueue.empty()) {
      currentLayer++;
      const int prevLayerNodeNumber = nodeQueue.size();

      for (int i = 0; i < prevLayerNodeNumber; i++) {
        const int node = nodeQueue.front();
        nodeQueue.pop();

        const std::vector<int>& neighboringNodes = adjacencyList[node];
        for (const int neighboringNode : neighboringNodes) {
          if (!nodeToLayer.contains(neighboringNode)) {
            nodeQueue.push(neighboringNode);
            nodeToLayer.insert({neighboringNode, currentLayer});
          } else if (nodeToLayer.at(neighboringNode) == currentLayer - 1) {
            return -1;
          }
        }
      }
    }

    return currentLayer;
  }
};
// @lc code=end
