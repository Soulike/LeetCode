/*
 * @lc app=leetcode id=1110 lang=cpp
 *
 * [1110] Delete Nodes And Return Forest
 */
#include <unordered_set>
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
  std::vector<TreeNode*> delNodes(TreeNode* root, std::vector<int>& to_delete) {
    std::unordered_set<int> deletedNodeVals(to_delete.cbegin(),
                                            to_delete.cend());
    std::vector<TreeNode*> newRoots;
    this->delNodesHelper(root, nullptr, true, deletedNodeVals, newRoots);
    return newRoots;
  }

 private:
  void delNodesHelper(TreeNode* root,
                      TreeNode* parent,
                      bool isParentDeleted,
                      const std::unordered_set<int>& deletedNodeVals,
                      std::vector<TreeNode*>& newRoots) {
    if (root == nullptr) {
      return;
    }
    bool shouldBeDeleted = deletedNodeVals.count(root->val) != 0;
    if (shouldBeDeleted) {
      if (parent && !isParentDeleted) {
        if (parent->left == root) {
          parent->left = nullptr;
        } else {
          parent->right = nullptr;
        }
      }
    } else if (isParentDeleted) {
      newRoots.push_back(root);
    }

    this->delNodesHelper(root->left, root, shouldBeDeleted, deletedNodeVals,
                         newRoots);
    this->delNodesHelper(root->right, root, shouldBeDeleted, deletedNodeVals,
                         newRoots);

    if (shouldBeDeleted) {
      delete root;
    }
  }
};
// @lc code=end
