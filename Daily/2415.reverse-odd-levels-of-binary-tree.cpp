/*
 * @lc app=leetcode id=2415 lang=cpp
 *
 * [2415] Reverse Odd Levels of Binary Tree
 */

#include <utility>

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
  TreeNode* reverseOddLevels(TreeNode* root) {
    dfs(root->left, root->right, true);
    return root;
  }

 private:
  void dfs(TreeNode* leftChild, TreeNode* rightChild, bool shouldReverse) {
    if (leftChild == nullptr || rightChild == nullptr) {
      return;
    }

    if (shouldReverse) {
      std::swap(leftChild->val, rightChild->val);
    }

    dfs(leftChild->left, rightChild->right, !shouldReverse);
    dfs(rightChild->left, leftChild->right, !shouldReverse);
  }
};

// @lc code=end
