/*
 * @lc app=leetcode id=1028 lang=cpp
 *
 * [1028] Recover a Tree From Preorder Traversal
 */

#include <string>
#include <vector>

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode() : val(0), left(nullptr), right(nullptr) {}
  TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
  TreeNode(int x, TreeNode* left, TreeNode* right)
      : val(x), left(left), right(right) {}
};

// @lc code=start
class Solution {
 public:
  TreeNode* recoverFromPreorder(const std::string& traversal) {
    std::vector<NodeInfo> nodeInfos = parseTraversalString(traversal);
    RecoverTreeInfo treeInfo = recoverTree(nodeInfos, 0);
    return treeInfo.recoveredRoot;
  }

 private:
  class NodeInfo {
   public:
    int value;
    int depth;
    int indexInNodeInfo;
    int nextNodeInfoIndex;
  };

  class RecoverTreeInfo {
   public:
    TreeNode* recoveredRoot;
    int nextTreeRootNodeInfoIndex;
  };

 private:
  static RecoverTreeInfo recoverTree(const std::vector<NodeInfo>& nodeInfos,
                                     const int rootIndex) {
    const NodeInfo& rootNodeInfo = nodeInfos[rootIndex];
    TreeNode* root = new TreeNode(rootNodeInfo.value);
    if (rootIndex + 1 >= nodeInfos.size() ||
        nodeInfos[rootIndex + 1].depth != rootNodeInfo.depth + 1) {
      return {root, rootIndex + 1};
    }

    RecoverTreeInfo leftChildTreeInfo = recoverTree(nodeInfos, rootIndex + 1);
    root->left = leftChildTreeInfo.recoveredRoot;
    if (leftChildTreeInfo.nextTreeRootNodeInfoIndex >= nodeInfos.size() ||
        nodeInfos[leftChildTreeInfo.nextTreeRootNodeInfoIndex].depth !=
            rootNodeInfo.depth + 1) {
      return {root, leftChildTreeInfo.nextTreeRootNodeInfoIndex};
    }

    RecoverTreeInfo rightChildTreeInfo =
        recoverTree(nodeInfos, leftChildTreeInfo.nextTreeRootNodeInfoIndex);
    root->right = rightChildTreeInfo.recoveredRoot;

    return {root, rightChildTreeInfo.nextTreeRootNodeInfoIndex};
  }

  static std::vector<NodeInfo> parseTraversalString(
      const std::string& traversal) {
    std::vector<NodeInfo> nodeInfos;
    NodeInfo currentNodeInfo(-1, -1, -1, 0);

    while (currentNodeInfo.nextNodeInfoIndex < traversal.size()) {
      currentNodeInfo =
          getNextNodeInfo(traversal, currentNodeInfo.nextNodeInfoIndex);
      nodeInfos.push_back(currentNodeInfo);
    }

    return nodeInfos;
  }

  static NodeInfo getNextNodeInfo(const std::string& traversal,
                                  const int index) {
    int depth = 0;
    int currentIndex = index;
    while (traversal[currentIndex] == '-') {
      depth++;
      currentIndex++;
    }

    int value = 0;
    while (currentIndex < traversal.size() && traversal[currentIndex] != '-') {
      value *= 10;
      value += traversal[currentIndex] - '0';
      currentIndex++;
    }

    return {value, depth, index, currentIndex};
  }
};
// @lc code=end
