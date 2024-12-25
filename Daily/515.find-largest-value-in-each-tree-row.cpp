/*
 * @lc app=leetcode id=515 lang=cpp
 *
 * [515] Find Largest Value in Each Tree Row
 */

#include <cmath>
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
  std::vector<int> largestValues(TreeNode* root) {
    std::vector<int> maxValuesInLevel;
    dfs(root, 0, maxValuesInLevel);
    return maxValuesInLevel;
  }

 private:
  static void dfs(TreeNode* root,
                  const int level,
                  std::vector<int>& /*out*/ maxValuesInLevel) {
    if (root == nullptr) {
      return;
    }
    if (maxValuesInLevel.size() == level) {
      maxValuesInLevel.push_back(root->val);
    } else {
      maxValuesInLevel[level] = std::max(maxValuesInLevel[level], root->val);
    }

    if (root->left) {
      dfs(root->left, level + 1, maxValuesInLevel);
    }
    if (root->right) {
      dfs(root->right, level + 1, maxValuesInLevel);
    }
  }
};
// @lc code=end
