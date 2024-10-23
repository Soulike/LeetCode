/*
 * @lc app=leetcode id=2641 lang=cpp
 *
 * [2641] Cousins in Binary Tree II
 */

#include <queue>
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
  TreeNode* replaceValueInTree(TreeNode* root) {
    std::vector<int> levelSums;
    std::queue<TreeNode*> nodeQueue;
    nodeQueue.push(root);

    while (!nodeQueue.empty()) {
      const int nodeQueueSize = static_cast<int>(nodeQueue.size());
      int levelSum = 0;
      for (int i = 0; i < nodeQueueSize; i++) {
        TreeNode* node = nodeQueue.front();
        nodeQueue.pop();
        levelSum += node->val;

        if (node->left) {
          nodeQueue.push(node->left);
        }
        if (node->right) {
          nodeQueue.push(node->right);
        }
      }
      levelSums.push_back(levelSum);
    }

    root->val = 0;
    nodeQueue.push(root);
    int currentLevel = 1;

    while (currentLevel < levelSums.size()) {
      const int nodeQueueSize = static_cast<int>(nodeQueue.size());
      const int levelSum = levelSums[currentLevel];

      for (int i = 0; i < nodeQueueSize; i++) {
        TreeNode* node = nodeQueue.front();
        nodeQueue.pop();

        const int childrenSum = (node->left ? node->left->val : 0) +
                                (node->right ? node->right->val : 0);

        if (node->left) {
          node->left->val = levelSum - childrenSum;
          nodeQueue.push(node->left);
        }
        if (node->right) {
          node->right->val = levelSum - childrenSum;
          nodeQueue.push(node->right);
        }
      }

      currentLevel++;
    }

    return root;
  }
};
// @lc code=end
