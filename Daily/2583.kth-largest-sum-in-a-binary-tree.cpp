/*
 * @lc app=leetcode id=2583 lang=cpp
 *
 * [2583] Kth Largest Sum in a Binary Tree
 */

#include <queue>

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
  long long kthLargestLevelSum(TreeNode* root, int k) {
    std::queue<TreeNode*> nodeQueue;
    std::priority_queue<long long, std::vector<long long>, std::greater<>>
        levelSumPq;

    long long currentLevelSum = 0;
    nodeQueue.push(root);

    while (!nodeQueue.empty()) {
      const int currentLevelSize = static_cast<int>(nodeQueue.size());
      for (int i = 0; i < currentLevelSize; i++) {
        TreeNode* node = nodeQueue.front();
        nodeQueue.pop();
        currentLevelSum += node->val;
        if (node->left) {
          nodeQueue.push(node->left);
        }
        if (node->right) {
          nodeQueue.push(node->right);
        }
      }

      levelSumPq.push(currentLevelSum);
      if (levelSumPq.size() > k) {
        levelSumPq.pop();
      }
      currentLevelSum = 0;
    }

    if (levelSumPq.size() < k) {
      return -1;
    }

    return levelSumPq.top();
  }
};
// @lc code=end
