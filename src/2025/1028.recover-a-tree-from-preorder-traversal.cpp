/*
 * @lc app=leetcode id=1028 lang=cpp
 *
 * [1028] Recover a Tree From Preorder Traversal
 */

#include <memory>
#include <stack>
#include <string>

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
    // TreeNodes in the stack should be depth-increasing.
    std::stack<std::shared_ptr<NodeInfo>> nodeInfoStack;
    std::shared_ptr<NodeInfo> currentNodeInfo =
        std::make_shared<NodeInfo>(nullptr, -1, 0);
    while (currentNodeInfo->nextNodeInfoIndexInTraversal < traversal.size()) {
      currentNodeInfo = getNextNodeInfo(
          traversal, currentNodeInfo->nextNodeInfoIndexInTraversal);
      if (nodeInfoStack.empty()) {
        nodeInfoStack.push(currentNodeInfo);
        continue;
      }
      while (!nodeInfoStack.empty() &&
             nodeInfoStack.top()->depth + 1 != currentNodeInfo->depth) {
        nodeInfoStack.pop();
      }
      if (!nodeInfoStack.top()->node->left) {
        nodeInfoStack.top()->node->left = currentNodeInfo->node;
      } else if (!nodeInfoStack.top()->node->right) {
        nodeInfoStack.top()->node->right = currentNodeInfo->node;
      }
      nodeInfoStack.push(currentNodeInfo);
    }

    while (nodeInfoStack.size() > 1) {
      nodeInfoStack.pop();
    }

    return nodeInfoStack.top()->node;
  }

 private:
  class NodeInfo {
   public:
    TreeNode* node;
    int depth;
    int nextNodeInfoIndexInTraversal;
  };

  static std::shared_ptr<NodeInfo> getNextNodeInfo(const std::string& traversal,
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

    TreeNode* node = new TreeNode(value);

    return std::make_shared<NodeInfo>(node, depth, currentIndex);
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.recoverFromPreorder("1-2--3--4-5--6--7");
}
