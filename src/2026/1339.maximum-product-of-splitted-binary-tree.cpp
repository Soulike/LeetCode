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
    const std::uint64_t total_sum = GetTreeSum(root);
    std::uint64_t result = 0;
    dfs(root, total_sum, result);
    return static_cast<int>(result % kMod);
  }

 private:
  static std::uint64_t GetTreeSum(TreeNode* root) {
    if (!root) {
      return 0;
    }
    const std::uint64_t left_subtree_sum = GetTreeSum(root->left);
    const std::uint64_t right_subtree_sum = GetTreeSum(root->right);
    const std::uint64_t tree_sum =
        root->val + left_subtree_sum + right_subtree_sum;
    return tree_sum;
  }

  static std::uint64_t dfs(TreeNode* root,
                           const std::uint64_t total_sum,
                           std::uint64_t& max_product) {
    if (!root) {
      return 0;
    }
    const std::uint64_t left_subtree_sum =
        dfs(root->left, total_sum, max_product);
    const std::uint64_t right_subtree_sum =
        dfs(root->right, total_sum, max_product);
    const std::uint64_t tree_sum =
        root->val + left_subtree_sum + right_subtree_sum;

    max_product = std::max(max_product, (total_sum - tree_sum) * tree_sum);

    return tree_sum;
  }
};
// @lc code=end
