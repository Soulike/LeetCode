/*
 * @lc app=leetcode id=129 lang=cpp
 *
 * [129] Sum Root to Leaf Numbers
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
  int sum;
  int currentNum;

  Solution() {
    sum = 0;
    currentNum = 0;
  }

  int sumNumbers(TreeNode* root) {
    backtrack(root);
    return sum;
  }

 private:
  void backtrack(TreeNode* root) {
    if (root == nullptr) {
      return;
    }

    currentNum *= 10;
    currentNum += root->val;
    if (root->left == nullptr && root->right == nullptr) {
      sum += currentNum;
    } else {
      backtrack(root->left);
      backtrack(root->right);
    }
    currentNum -= root->val;
    currentNum /= 10;
  }
};
// @lc code=end
