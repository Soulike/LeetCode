/*
 * @lc app=leetcode id=404 lang=cpp
 *
 * [404] Sum of Left Leaves
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
  int sumOfLeftLeaves(TreeNode* root) {
    if (root == nullptr) {
      return 0;
    }
    int leftChildSum =
        root->left == nullptr
            ? 0
            : (isLeafNode(root->left) ? root->left->val
                                      : sumOfLeftLeaves(root->left));
    int rightChildSum = sumOfLeftLeaves(root->right);

    return leftChildSum + rightChildSum;
  }

  inline bool isLeafNode(const TreeNode* node) {
    return node->left == nullptr && node->right == nullptr;
  }
};
// @lc code=end
