/*
 * @lc app=leetcode id=2467 lang=cpp
 *
 * [2467] Most Profitable Path in a Tree
 */

#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int mostProfitablePath(const std::vector<std::vector<int>>& edges,
                         const int bob,
                         const std::vector<int>& amount) {
    const std::vector<std::vector<int>> adjacencyList =
        convertEdgesToAdjacencyList(edges);
    const std::vector<int> bobNodeAtSecond = getBobPath(adjacencyList, bob);

    const int maxAliceProfit =
        getAliceMaxProfit(adjacencyList, bobNodeAtSecond, amount);
    return maxAliceProfit;
  }

 private:
  static std::vector<std::vector<int>> convertEdgesToAdjacencyList(
      const std::vector<std::vector<int>>& edges) {
    const size_t kNodeNumber = edges.size() + 1;
    std::vector<std::vector<int>> adjacencyList(kNodeNumber,
                                                std::vector<int>());
    for (const std::vector<int>& edge : edges) {
      const int node1 = edge[0];
      const int node2 = edge[1];

      adjacencyList[node1].push_back(node2);
      adjacencyList[node2].push_back(node1);
    }

    return adjacencyList;
  }

  static std::vector<int> getBobPath(
      const std::vector<std::vector<int>>& adjacencyList,
      const int bobNode) {
    std::unordered_set<int> visitedNodes;
    std::vector<int> currentPath;
    getBobPathDfs(adjacencyList, bobNode, visitedNodes, currentPath);
    return currentPath;
  }

  static bool getBobPathDfs(const std::vector<std::vector<int>>& adjacencyList,
                            const int bobNode,
                            std::unordered_set<int>& visitedNodes,
                            std::vector<int>& path) {
    visitedNodes.insert(bobNode);
    path.push_back(bobNode);

    if (bobNode == 0) {
      return true;
    }

    for (const int adjacentNode : adjacencyList[bobNode]) {
      if (!visitedNodes.contains(adjacentNode)) {
        if (getBobPathDfs(adjacencyList, adjacentNode, visitedNodes, path)) {
          return true;
        }
      }
    }

    path.pop_back();
    return false;
  }

  static int getAliceMaxProfit(
      const std::vector<std::vector<int>>& adjacencyList,
      const std::vector<int>& bobNodeAtSecond,
      const std::vector<int>& amount) {
    std::unordered_set<int> aliceVisitedNodes;
    aliceVisitedNodes.insert(0);
    std::unordered_set<int> bobVisitedNodes;
    bobVisitedNodes.insert(bobNodeAtSecond[0]);
    int currentProfit = 0;
    currentProfit += amount[0];

    int maxProfit = INT_MIN;

    getAliceMaxProfitDfs(adjacencyList, bobNodeAtSecond, 0, 0, amount,
                         bobVisitedNodes, aliceVisitedNodes, currentProfit,
                         maxProfit);

    return maxProfit;
  }

  static void getAliceMaxProfitDfs(
      const std::vector<std::vector<int>>& adjacencyList,
      const std::vector<int>& bobNodeAtSecond,
      const int aliceNode,
      const int currentSecond,
      const std::vector<int>& amount,
      std::unordered_set<int>& bobVisitedNodes,
      std::unordered_set<int>& aliceVisitedNodes,
      int& currentProfit,
      int& maxProfit) {
    const std::vector<int>& adjacentNodes = adjacencyList[aliceNode];
    // Is leaf node
    if (adjacentNodes.size() == 1 &&
        aliceVisitedNodes.contains(adjacentNodes[0])) {
      maxProfit = std::max(maxProfit, currentProfit);
      return;
    }

    if (currentSecond < bobNodeAtSecond.size()) {
      bobVisitedNodes.insert(bobNodeAtSecond[currentSecond]);
    }

    for (const int adjacentNode : adjacentNodes) {
      if (aliceVisitedNodes.contains(adjacentNode)) {
        continue;
      }

      int priceWithBob = 0;
      if (currentSecond + 1 >= bobNodeAtSecond.size()) {
        priceWithBob = 0;
      } else if (bobVisitedNodes.contains(adjacentNode)) {
        priceWithBob = -amount[adjacentNode];
      } else if (bobNodeAtSecond[currentSecond + 1] == adjacentNode) {
        priceWithBob = amount[bobNodeAtSecond[currentSecond + 1]] / 2 * -1;
      }

      aliceVisitedNodes.insert(adjacentNode);
      currentProfit += amount[adjacentNode] + priceWithBob;
      getAliceMaxProfitDfs(adjacencyList, bobNodeAtSecond, adjacentNode,
                           currentSecond + 1, amount, bobVisitedNodes,
                           aliceVisitedNodes, currentProfit, maxProfit);
      currentProfit -= amount[adjacentNode] + priceWithBob;
      aliceVisitedNodes.erase(adjacentNode);
    }

    if (currentSecond < bobNodeAtSecond.size()) {
      bobVisitedNodes.erase(bobNodeAtSecond[currentSecond]);
    }
  }
};
// @lc code=end
