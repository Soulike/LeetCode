/*
 * @lc app=leetcode id=1123 lang=cpp
 *
 * [1123] Lowest Common Ancestor of Deepest Leaves
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
  TreeNode* lcaDeepestLeaves(TreeNode* root) {
    const SubTreeInfo result = dfs(root);
    return result.lowest_common_ancestor_node_;
  }

 private:
  class SubTreeInfo {
   public:
    TreeNode* lowest_common_ancestor_node_ = nullptr;
    int depth_ = -1;
  };

  SubTreeInfo dfs(TreeNode* root) {
    if (!root) {
      return {nullptr, 0};
    }

    const SubTreeInfo left_subtree_info = dfs(root->left);
    const SubTreeInfo right_subtree_info = dfs(root->right);

    if (left_subtree_info.depth_ > right_subtree_info.depth_) {
      return {left_subtree_info.lowest_common_ancestor_node_,
              left_subtree_info.depth_ + 1};
    }

    if (left_subtree_info.depth_ < right_subtree_info.depth_) {
      return {right_subtree_info.lowest_common_ancestor_node_,
              right_subtree_info.depth_ + 1};
    }

    return {root, left_subtree_info.depth_ + 1};
  }
};
// @lc code=end
