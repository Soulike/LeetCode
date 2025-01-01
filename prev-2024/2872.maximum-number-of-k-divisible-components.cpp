/*
 * @lc app=leetcode id=2872 lang=cpp
 *
 * [2872] Maximum Number of K-Divisible Components
 */
#include <memory>
#include <unordered_map>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 private:
  class TreeNode {
   public:
    int value;
    std::vector<TreeNode*> children;
  };

 public:
  int maxKDivisibleComponents(const int n,
                              const std::vector<std::vector<int> >& edges,
                              const std::vector<int>& values,
                              const int k) {
    std::vector<std::unique_ptr<TreeNode> > treeNodes(n);
    for (int i = 0; i < treeNodes.size(); i++) {
      treeNodes[i] = std::make_unique<TreeNode>();
      treeNodes[i]->value = values[i];
    }

    std::unordered_map<int, std::vector<int> > nodeIndexToNeighborIndexes;
    for (const std::vector<int>& edge : edges) {
      const int node1Index = edge[0];
      const int node2Index = edge[1];

      nodeIndexToNeighborIndexes[node1Index].push_back(node2Index);
      nodeIndexToNeighborIndexes[node2Index].push_back(node1Index);
    }

    constructTree(treeNodes, 0, nodeIndexToNeighborIndexes);

    int componentsNumber =
        getMaximumValidComponentsNumber(treeNodes[0].get(), k);
    return componentsNumber;
  }

 private:
  class SubTreeInfo {
   public:
    int sumRemainder;
    int componentsNumber;
  };

 private:
  static void constructTree(
      const std::vector<std::unique_ptr<TreeNode> >& treeNodes,
      const int rootNodeIndex,
      const std::unordered_map<int, std::vector<int> >&
          nodeIndexToNeighborIndexes) {
    std::unordered_set<int> visitedNodeIndexes;
    visitedNodeIndexes.insert(rootNodeIndex);
    constructTreeHelper(treeNodes, rootNodeIndex, nodeIndexToNeighborIndexes,
                        visitedNodeIndexes);
  }

  static void constructTreeHelper(
      const std::vector<std::unique_ptr<TreeNode> >& treeNodes,
      const int rootNodeIndex,
      const std::unordered_map<int, std::vector<int> >&
          nodeIndexToNeighborIndexes,
      std::unordered_set<int>& visitedNodeIndexes) {
    if (!nodeIndexToNeighborIndexes.contains(rootNodeIndex)) {
      return;
    }
    const std::vector<int>& rootNodeNeighborIndexes =
        nodeIndexToNeighborIndexes.at(rootNodeIndex);
    for (const int neighborIndex : rootNodeNeighborIndexes) {
      if (visitedNodeIndexes.contains(neighborIndex)) {
        continue;
      }
      visitedNodeIndexes.insert(neighborIndex);
      treeNodes[rootNodeIndex]->children.push_back(
          treeNodes[neighborIndex].get());
      constructTreeHelper(treeNodes, neighborIndex, nodeIndexToNeighborIndexes,
                          visitedNodeIndexes);
    }
  }

  static int getMaximumValidComponentsNumber(TreeNode* rootNode, const int k) {
    const SubTreeInfo rootTreeInfo =
        getMaximumValidComponentsNumberHelper(rootNode, k);
    return rootTreeInfo.componentsNumber;
  }

  static SubTreeInfo getMaximumValidComponentsNumberHelper(
      const TreeNode* rootNode,
      const int k) {
    int remainder = rootNode->value % k;
    int componentsNumber = 0;
    for (const TreeNode* node : rootNode->children) {
      const SubTreeInfo subTreeInfo =
          getMaximumValidComponentsNumberHelper(node, k);
      remainder += subTreeInfo.sumRemainder;
      remainder %= k;
      componentsNumber += subTreeInfo.componentsNumber;
    }

    if (remainder == 0) {
      componentsNumber++;
    }

    return {remainder, componentsNumber};
  }
};

// @lc code=end
