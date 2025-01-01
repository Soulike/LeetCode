/*
 * @lc app=leetcode id=1038 lang=cpp
 *
 * [1038] Binary Search Tree to Greater Sum Tree
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
  Solution() { this->currentSum = 0; }

  TreeNode* bstToGst(TreeNode* root) {
    this->inOrderTraverse(root);
    return root;
  }

 private:
  int currentSum;

  void inOrderTraverse(TreeNode* root) {
    if (root == nullptr) {
      return;
    }
    this->inOrderTraverse(root->right);
    currentSum += root->val;
    root->val = currentSum;
    this->inOrderTraverse(root->left);
  }
};
// @lc code=end
