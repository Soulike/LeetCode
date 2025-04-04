/*
 * @lc app=leetcode id=236 lang=cpp
 *
 * [236] Lowest Common Ancestor of a Binary Tree
 */

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// @lc code=start
class Solution {
 public:
  TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    const SearchResult search_result = Search(root, p, q);
    return search_result.common_ancestor_;
  }

 private:
  class SearchResult {
   public:
    TreeNode* common_ancestor_ = nullptr;
    bool found_p_ = false;
    bool found_q_ = false;
  };

  SearchResult Search(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root) {
      return {nullptr, false, false};
    }

    SearchResult search_result;

    if (root == p) {
      search_result.found_p_ = true;
    }
    if (root == q) {
      search_result.found_q_ = true;
    }

    const SearchResult left_subtree_search_result = Search(root->left, p, q);
    const SearchResult right_subtree_search_result = Search(root->right, p, q);

    if (left_subtree_search_result.found_p_ &&
        left_subtree_search_result.found_q_) {
      return left_subtree_search_result;
    }

    if (right_subtree_search_result.found_p_ &&
        right_subtree_search_result.found_q_) {
      return right_subtree_search_result;
    }

    search_result.found_p_ = search_result.found_p_ ||
                             left_subtree_search_result.found_p_ ||
                             right_subtree_search_result.found_p_;
    search_result.found_q_ = search_result.found_q_ ||
                             left_subtree_search_result.found_q_ ||
                             right_subtree_search_result.found_q_;
    if (search_result.found_p_ && search_result.found_q_) {
      search_result.common_ancestor_ = root;
    }

    return search_result;
  }
};
// @lc code=end
