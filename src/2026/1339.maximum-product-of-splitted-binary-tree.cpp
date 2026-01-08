/*
 * @lc app=leetcode id=1339 lang=cpp
 *
 * [1339] Maximum Product of Splitted Binary Tree
 */

#include <algorithm>
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
  int maxProduct(TreeNode* root) {
    static constexpr std::uint64_t kMod = 1e9 + 7;
    TransformToSumTree(root);
    const std::uint64_t result = GetMaxProductMod(root, root->val) % kMod;
    return static_cast<int>(result);
  }

 private:
  static void TransformToSumTree(TreeNode* root) {
    if (root->left) {
      TransformToSumTree(root->left);
      root->val += root->left->val;
    }

    if (root->right) {
      TransformToSumTree(root->right);
      root->val += root->right->val;
    }
  }

  static std::uint64_t GetMaxProductMod(TreeNode* root,
                                        const std::uint64_t total_sum) {
    if (root == nullptr) {
      return 0;
    }
    const std::uint64_t left_subtree_max_product =
        GetMaxProductMod(root->left, total_sum);
    const std::uint64_t right_subtree_max_product =
        GetMaxProductMod(root->right, total_sum);

    const std::uint64_t remove_left_subtree_product =
        root->left ? ((total_sum - root->left->val) * root->left->val) : 0;
    const std::uint64_t remove_right_subtree_product =
        root->right ? ((total_sum - root->right->val) * root->right->val) : 0;

    return std::max({left_subtree_max_product, right_subtree_max_product,
                     remove_left_subtree_product,
                     remove_right_subtree_product});
  }
};
// @lc code=end
