/*
 * @lc app=leetcode id=623 lang=cpp
 *
 * [623] Add One Row to Tree
 */

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
  TreeNode* addOneRow(TreeNode* root, int val, int depth) {
    if (root == nullptr) {
      return root;
    }
    if (depth == 1) {
      auto* newRoot = new TreeNode(val, root, nullptr);
      return newRoot;
    }
    if (depth == 2) {
      auto* leftChild = root->left;
      auto* rightChild = root->right;
      root->left = new TreeNode(val, leftChild, nullptr);
      root->right = new TreeNode(val, nullptr, rightChild);
      return root;
    }

    root->left = addOneRow(root->left, val, depth - 1);
    root->right = addOneRow(root->right, val, depth - 1);
    return root;
  }
};
// @lc code=end
