/*
 * @lc app=leetcode id=145 lang=cpp
 *
 * [145] Binary Tree Postorder Traversal
 */
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
  std::vector<int> postorderTraversal(TreeNode* root) {
    std::vector<int> result;
    recursive(root, result);
    return result;
  }

 private:
  void recursive(TreeNode* root, std::vector<int>& result) {
    if (root == nullptr) {
      return;
    }
    recursive(root->left, result);
    recursive(root->right, result);
    result.push_back(root->val);
  }
};
// @lc code=end
