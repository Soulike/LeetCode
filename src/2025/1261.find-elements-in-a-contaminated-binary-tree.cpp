/*
 * @lc app=leetcode id=1261 lang=cpp
 *
 * [1261] Find Elements in a Contaminated Binary Tree
 */

#include <unordered_set>

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
class FindElements {
 public:
  FindElements(TreeNode* root) : root_(root) {
    root_->val = 0;
    elements.insert(0);
    recoverRoot(root_);
  }

  bool find(int target) { return elements.contains(target); }

 private:
  void recoverRoot(TreeNode* root) {
    elements.insert(root->val);
    if (root->left) {
      root->left->val = root->val * 2 + 1;
      recoverRoot(root->left);
    }
    if (root->right) {
      root->right->val = root->val * 2 + 2;
      recoverRoot(root->right);
    }
  }

 private:
  TreeNode* root_;
  std::unordered_set<int> elements;
};

/**
 * Your FindElements object will be instantiated and called as such:
 * FindElements* obj = new FindElements(root);
 * bool param_1 = obj->find(target);
 */
// @lc code=end
